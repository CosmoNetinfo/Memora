import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import AppIcon from '../components/AppIcon';

const PrivateChatPage = () => {
    const { receiverId } = useParams();
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState("");
    const [loading, setLoading] = useState(true);
    const [receiverProfile, setReceiverProfile] = useState(null);
    const messagesEndRef = useRef(null);

    const user = JSON.parse(localStorage.getItem('alzheimer_user') || '{}');
    const currentUserId = user.id;

    useEffect(() => {
        if (!receiverId || !currentUserId) return;
        fetchReceiverProfile();
        fetchMessages();

        const channel = supabase
            .channel(`private-chat-${[currentUserId, receiverId].sort().join('-')}`)
            .on('postgres_changes',
                { 
                    event: 'INSERT', 
                    schema: 'public', 
                    table: 'private_messages',
                    filter: `sender_id=eq.${receiverId},receiver_id=eq.${currentUserId}`
                },
                (payload) => handleNewMessage(payload.new)
            )
            .on('postgres_changes',
                { 
                    event: 'INSERT', 
                    schema: 'public', 
                    table: 'private_messages',
                    filter: `sender_id=eq.${currentUserId},receiver_id=eq.${receiverId}`
                },
                (payload) => handleNewMessage(payload.new)
            )
            .subscribe();

        return () => { supabase.removeChannel(channel); };
    }, [receiverId, currentUserId]);

    const handleNewMessage = (msg) => {
        setMessages(prev => {
            if (prev.find(m => m.id === msg.id)) return prev;
            return [...prev, {
                id: msg.id,
                text: msg.content,
                sender: msg.sender_id === currentUserId ? 'me' : 'other',
                time: new Date(msg.created_at).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })
            }];
        });
        setTimeout(scrollToBottom, 50);
    };

    const fetchReceiverProfile = async () => {
        const { data } = await supabase.from('profiles').select('*').eq('id', receiverId).single();
        if (data) setReceiverProfile(data);
    };

    const fetchMessages = async () => {
        try {
            const { data } = await supabase
                .from('private_messages')
                .select('*')
                .or(`and(sender_id.eq.${currentUserId},receiver_id.eq.${receiverId}),and(sender_id.eq.${receiverId},receiver_id.eq.${currentUserId})`)
                .order('created_at', { ascending: true });
            
            if (data) {
                setMessages(data.map(msg => ({
                    id: msg.id,
                    text: msg.content,
                    sender: msg.sender_id === currentUserId ? 'me' : 'other',
                    time: new Date(msg.created_at).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })
                })));
            }
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (!loading) scrollToBottom();
    }, [messages, loading]);

    const handleSend = async () => {
        if (!inputText.trim()) return;
        const textToSend = inputText;
        setInputText(""); 

        const { error } = await supabase.from('private_messages').insert([{
            content: textToSend,
            sender_id: currentUserId,
            receiver_id: receiverId
        }]);

        if (error) {
            setInputText(textToSend);
            alert("Errore invio");
        } else {
            setTimeout(scrollToBottom, 50);
        }
    };

    const styles = {
        container: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'var(--color-bg-primary)',
            overflow: 'hidden',
        },
        header: {
            padding: '12px 16px',
            backgroundColor: 'white',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            zIndex: 10,
        },
        avatar: {
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            overflow: 'hidden',
        },
        messageList: {
            flex: 1,
            overflowY: 'auto',
            padding: '20px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
        },
        bubble: (sender) => ({
            maxWidth: '80%',
            padding: '10px 14px',
            borderRadius: '18px',
            backgroundColor: sender === 'me' ? 'var(--color-primary)' : 'white',
            color: sender === 'me' ? 'white' : 'var(--color-text-primary)',
            alignSelf: sender === 'me' ? 'flex-end' : 'flex-start',
            boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
            borderBottomRightRadius: sender === 'me' ? '4px' : '18px',
            borderBottomLeftRadius: sender === 'me' ? '18px' : '4px',
        }),
        messageText: {
            margin: 0,
            fontSize: '15px',
            lineHeight: '1.4',
        },
        messageTime: {
            fontSize: '10px',
            opacity: 0.7,
            textAlign: 'right',
            marginTop: '4px',
        },
        inputArea: {
            padding: '12px 16px',
            backgroundColor: 'white',
            borderTop: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
        },
        input: {
            flex: 1,
            padding: '10px 16px',
            borderRadius: '20px',
            border: '1px solid #E5E7EB',
            fontSize: '15px',
            outline: 'none',
            backgroundColor: '#F9FAFB',
        },
        sendButton: {
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-primary)',
            border: 'none',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
        }
    };

    if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Caricamento...</div>;

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    <AppIcon name="arrow-left" size={24} color="primary" />
                </button>
                <div style={styles.avatar}>
                    {receiverProfile?.photo_url ? <img src={receiverProfile.photo_url} style={{width:'100%',height:'100%',objectFit:'cover'}} alt="P" /> : receiverProfile?.name?.[0]}
                </div>
                <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 'bold' }}>{receiverProfile?.name} {receiverProfile?.surname}</div>
                    <div style={{ fontSize: '11px', color: '#10b981' }}>Online</div>
                </div>
            </div>

            <div style={styles.messageList}>
                {messages.length === 0 && <div style={{ textAlign: 'center', color: '#9CA3AF', marginTop: '20px' }}>Inizia la conversazione con un messaggio!</div>}
                {messages.map(msg => (
                    <div key={msg.id} style={styles.bubble(msg.sender)}>
                        <p style={styles.messageText}>{msg.text}</p>
                        <div style={styles.messageTime}>{msg.time}</div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div style={styles.inputArea}>
                <input
                    type="text"
                    placeholder="Messaggio..."
                    style={styles.input}
                    value={inputText}
                    onChange={e => setInputText(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && handleSend()}
                />
                <button style={styles.sendButton} onClick={handleSend}>
                    <AppIcon name="paper-plane" size={20} color="white" />
                </button>
            </div>
        </div>
    );
};

export default PrivateChatPage;
