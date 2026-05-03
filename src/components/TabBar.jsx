import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import AppIcon from './AppIcon';
import { supabase } from '../supabaseClient';
import styles from './TabBar.module.css';

const TabBar = () => {
    const [hasUnread, setHasUnread] = useState(false);
    const user = JSON.parse(localStorage.getItem('alzheimer_user') || '{}');

    useEffect(() => {
        if (!user.id) return;

        const checkUnread = async () => {
            const { count } = await supabase
                .from('private_messages')
                .select('*', { count: 'exact', head: true })
                .eq('receiver_id', user.id)
                .eq('is_read', false);
            
            setHasUnread(count > 0);
        };

        checkUnread();

        // Realtime per nuovi messaggi
        const channel = supabase
            .channel('unread-notifications')
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'private_messages',
                filter: `receiver_id=eq.${user.id}`
            }, () => {
                setHasUnread(true);
            })
            .on('postgres_changes', {
                event: 'UPDATE',
                schema: 'public',
                table: 'private_messages',
                filter: `receiver_id=eq.${user.id}`
            }, (payload) => {
                if (payload.new.is_read) {
                    checkUnread();
                }
            })
            .subscribe();

        return () => supabase.removeChannel(channel);
    }, [user.id]);

    return (
        <nav className={`${styles.tabBar} bottom-navbar`} aria-label="Navigazione principale">
            <NavLink
                to="/"
                className={({ isActive }) => `${styles.tab} ${isActive ? styles.active : ''}`}
            >
                <AppIcon name="home" size={24} />
                <span className={styles.label}>HOME</span>
            </NavLink>

            <NavLink
                to="/chat"
                className={({ isActive }) => `${styles.tab} ${isActive ? styles.active : ''}`}
            >
                <div style={{ position: 'relative' }}>
                    <AppIcon name="comments" size={24} />
                    {hasUnread && (
                        <div style={{
                            position: 'absolute',
                            top: '-2px',
                            right: '-2px',
                            width: '10px',
                            height: '10px',
                            backgroundColor: '#EF4444',
                            borderRadius: '50%',
                            border: '2px solid white'
                        }} />
                    )}
                </div>
                <span className={styles.label}>Chat</span>
            </NavLink>

            <NavLink
                to="/feed"
                className={({ isActive }) => `${styles.tab} ${isActive ? styles.active : ''}`}
            >
                <AppIcon name="users-alt" size={24} />
                <span className={styles.label}>Social</span>
            </NavLink>

            <NavLink
                to="/profilo"
                className={({ isActive }) => `${styles.tab} ${isActive ? styles.active : ''}`}
            >
                <AppIcon name="user" size={24} />
                <span className={styles.label}>Profilo</span>
            </NavLink>
        </nav>
    );
};

export default TabBar;

