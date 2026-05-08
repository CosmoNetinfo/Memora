import React, { useState, useEffect } from 'react';
import useDebugStore from '../../store/debugStore';

const DebugConsole = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isSuperAdmin, setIsSuperAdmin] = useState(false);
    const logs = useDebugStore((state) => state.logs);
    const clearLogs = useDebugStore((state) => state.clearLogs);
    const getLogsAsText = useDebugStore((state) => state.getLogsAsText);

    const [filter, setFilter] = useState('all'); // all, info, warn, error
    const [expandedLogId, setExpandedLogId] = useState(null);

    // Check role on mount and storage change
    useEffect(() => {
        const checkRole = () => {
            const userRaw = localStorage.getItem('alzheimer_user');
            if (userRaw) {
                try {
                    const user = JSON.parse(userRaw);
                    setIsSuperAdmin(user.role === 'super_admin');
                } catch (err) {}
            } else {
                setIsSuperAdmin(false);
            }
        };
        checkRole();
        
        // Ascoltiamo anche eventi custom nel caso in cui App.jsx modifichi lo storage
        window.addEventListener('storage', checkRole);
        return () => window.removeEventListener('storage', checkRole);
    }, []);

    // Secret combo listener (Ctrl + Shift + D) come alternativa Desktop
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'd') {
                e.preventDefault();
                setIsVisible(prev => {
                    if (!prev && !isSuperAdmin) {
                        console.warn("Debug Console: Accesso negato.");
                        return false;
                    }
                    return !prev;
                });
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isSuperAdmin]);

    // Se l'utente non è super admin, non mostriamo assolutamente nulla
    if (!isSuperAdmin) return null;

    return (
        <>
            {/* Pulsante flottante invisibile/semi-trasparente per Mobile & Desktop */}
            {!isVisible && (
                <button
                    onClick={() => setIsVisible(true)}
                    style={{
                        position: 'fixed',
                        bottom: '20px',
                        left: '20px',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(0,0,0,0.3)',
                        color: 'white',
                        border: 'none',
                        zIndex: 99998,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '20px',
                        backdropFilter: 'blur(4px)',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}
                    title="Apri Debug Console"
                >
                    🪲
                </button>
            )}

            {/* Debug Console UI */}
            {isVisible && (
                <div style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
            width: '90%',
            maxWidth: '500px',
            height: '60vh',
            maxHeight: '600px',
            backgroundColor: '#1f2937',
            color: '#f3f4f6',
            borderRadius: '12px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            fontFamily: 'monospace'
        }}>
            {/* Header */}
            <div style={{ padding: '12px 16px', backgroundColor: '#111827', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #374151' }}>
                <div style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    🪲 Debug Console
                </div>
                <button 
                    onClick={() => setIsVisible(false)}
                    style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', fontSize: '18px' }}
                >
                    ×
                </button>
            </div>

            {/* Controls */}
            <div style={{ padding: '8px 16px', display: 'flex', gap: '8px', borderBottom: '1px solid #374151', flexWrap: 'wrap' }}>
                <select 
                    value={filter} 
                    onChange={(e) => setFilter(e.target.value)}
                    style={{ backgroundColor: '#374151', color: 'white', border: 'none', borderRadius: '4px', padding: '4px 8px' }}
                >
                    <option value="all">Tutti ({logs.length})</option>
                    <option value="error">Errori ({logs.filter(l => l.level === 'error').length})</option>
                    <option value="warn">Avvisi ({logs.filter(l => l.level === 'warn').length})</option>
                    <option value="info">Info ({logs.filter(l => l.level === 'info').length})</option>
                </select>

                <button 
                    onClick={clearLogs}
                    style={{ backgroundColor: '#374151', color: 'white', border: 'none', borderRadius: '4px', padding: '4px 8px', cursor: 'pointer' }}
                >
                    Pulisci
                </button>
                <div style={{ flex: 1 }} />
                <button 
                    onClick={handleSendReport}
                    style={{ backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', padding: '4px 12px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    Invia Report
                </button>
            </div>

            {/* Log List */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '8px' }}>
                {filteredLogs.length === 0 ? (
                    <div style={{ textAlign: 'center', marginTop: '20px', color: '#9ca3af' }}>Nessun log trovato.</div>
                ) : (
                    filteredLogs.map(log => (
                        <div key={log.id} style={{ marginBottom: '8px', backgroundColor: '#374151', borderRadius: '6px', overflow: 'hidden' }}>
                            <div 
                                onClick={() => setExpandedLogId(expandedLogId === log.id ? null : log.id)}
                                style={{ padding: '8px', display: 'flex', cursor: 'pointer', alignItems: 'flex-start', borderLeft: `4px solid ${getLevelColor(log.level)}` }}
                            >
                                <div style={{ minWidth: '60px', fontSize: '10px', color: '#9ca3af', paddingTop: '2px' }}>
                                    {new Date(log.timestamp).toLocaleTimeString()}
                                </div>
                                <div style={{ flex: 1, wordBreak: 'break-word', fontSize: '12px' }}>
                                    <span style={{ color: '#9ca3af', marginRight: '8px' }}>[{log.source}]</span>
                                    {log.message}
                                </div>
                            </div>
                            
                            {/* Expanded Details */}
                            {expandedLogId === log.id && log.details && (
                                <div style={{ padding: '8px', backgroundColor: '#111827', fontSize: '11px', borderTop: '1px solid #4b5563', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                                    {JSON.stringify(log.details, null, 2)}
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
            )}
        </>
    );
};

export default DebugConsole;
