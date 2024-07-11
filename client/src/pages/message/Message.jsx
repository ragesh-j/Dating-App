import { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import messageStyles from './message.module.css';
import { SocketContext } from '../../routing/SocketProvider';

function Message() {
    const { conversationId, receiverId } = useParams();
    const [userId, setUserId] = useState('');
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const scrollRef = useRef();
    const {socket,onlineUsers} = useContext(SocketContext);

    useEffect(() => {
        console.log('Socket:', socket.current);
    }, [socket.current]);

    const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const handleSubmit = async () => {
        if (newMessage.trim() === '') return;

        const token = localStorage.getItem('jwtToken');
        if (!token) return;

        if (socket.current) {
            socket.current.emit('sendMessage', {
                senderId: userId,
                receiverId: receiverId,
                text: newMessage,
            });
        }

        try {
            const response = await fetch('http://localhost:8000/message', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ conversationId, text: newMessage }),
            });
            const data = await response.json();
            if (!response.ok) {
                console.log(data);
            } else {
                setMessages([...messages, data]);
                setNewMessage('');
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const getMessages = async () => {
            const token = localStorage.getItem('jwtToken');
            if (!token) return;

            try {
                const response = await fetch(`http://localhost:8000/message/${conversationId}`, {
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                if (!response.ok) {
                    console.log(data);
                } else {
                    setUserId(data.userId);
                    setMessages(data.message);
                }
            } catch (err) {
                console.log(err);
            }
        };
        getMessages();
    }, [conversationId]);

    useEffect(() => {
        if (socket.current) {
            socket.current.on('getMessage', (data) => {
                setArrivalMessage({
                    senderId: data.senderId,
                    text: data.text,
                    createdAt: Date.now(),
                });
            });

            return () => {
                socket.current.off('getMessage');
            };
        }
    }, [socket.current]);

    useEffect(() => {
        if (arrivalMessage) {
            setMessages((prev) => [...prev, arrivalMessage]);
        }
    }, [arrivalMessage]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className={messageStyles.messageContainer}>
            <div className={messageStyles.messageHeader}>
                <h4>Conversation</h4>
            </div>
            <div className={messageStyles.messageList} ref={scrollRef}>
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`${messageStyles.messageItem} ${
                            message.senderId === userId ? messageStyles.sent : messageStyles.received
                        }`}
                    >
                        <p>{message.text}</p>
                        <span className={messageStyles.timestamp}>{formatTime(message.createdAt)}</span>
                    </div>
                ))}
            </div>
            <div className={messageStyles.messageInput}>
                <input
                    type='text'
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder='Type a message...'
                    className={messageStyles.inputField}
                />
                <button className={messageStyles.sendButton} onClick={handleSubmit}>
                    Send
                </button>
            </div>
        </div>
    );
}

export default Message;
