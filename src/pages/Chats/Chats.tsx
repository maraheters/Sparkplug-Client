import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { ChatWithMessages } from "../../api/sparkplugModels";
import { fetchChats, sendMessage as sendMessageApi } from "../../api/sparkplugMessagingApi";
import ChatPreview from "../../components/ChatPreview/ChatPreview";
import Chat from "../../components/Chat/Chat";
import styles from './Chats.module.scss';
import { useSubscription } from "react-stomp-hooks";

function Chats() {
    const [currentChat, setCurrentChat] = useState<ChatWithMessages | null>(null);
    const [chatsWithMessages, setChatsWithMessages] = useState<ChatWithMessages[]>([]);
    const { userAuth } = useAuth();

    useEffect(() => {
        const getChats = async () => {
            try {
                const data = await fetchChats(userAuth?.authToken!);
                console.log('getChats is running:', data);
                setChatsWithMessages(data);
    
                if (data.length > 0) {
                    setCurrentChat(data[data.length - 1]);
                }
            } catch (e) {
                console.error(e);
            }
        };
    
        if(chatsWithMessages.length < 1) {
            getChats();
        }
    
    }, []);

    useSubscription('/topic/messages/' + userAuth?.id, (message) => {
        const receivedMessage = JSON.parse(message.body);
        const {chatId, message: newMessage} = receivedMessage;

        setChatsWithMessages((prevChats) => {
            const updatedChats = prevChats.map(chat => {
                if (chat.chatId === chatId) {
                    return {
                        ...chat,
                        messages: [...chat.messages, newMessage], // Append new message
                    };
                }
                return chat;
            });

            return updatedChats;
        });

        
        if (currentChat && currentChat.chatId === chatId) {
            setCurrentChat((prev) => ({
                ...prev!,
                messages: [...prev!.messages, newMessage],
            }));
        }

    });

    const sendMessage = async (message: string) => {
        if (message.trim() && currentChat) {
            const sentAt = await sendMessageApi(userAuth?.authToken!, currentChat.chatId!, message);
            
            if (currentChat && userAuth) {
                setCurrentChat((prev) => ({
                    ...prev!,
                    messages: [...prev!.messages, {
                        senderId: userAuth.id,
                        senderUsername: userAuth.username,
                        content: message,
                        createdAt: sentAt,
                        read: false,
                    }],
                }));
            }
        }
    };

    const handleCurrentChatChange = (chatId: string) => {
        const selectedChat = chatsWithMessages.find(c => c.chatId === chatId) || null;
        setCurrentChat(selectedChat);
    };

    const chatList = chatsWithMessages
        .map(c => (
                <ChatPreview key={c.chatId} handleClicked={handleCurrentChatChange} chat={c} previewUrl="" />
            ))
        .reverse();


    return (
        <div className={styles.chatListAndChatContainer}>
            <div className={styles.chatListContainer}>
                {chatList}
            </div>
            
            <Chat handleSubmit={sendMessage} chatWithMessages={currentChat} />
        </div>
    );
}

export default Chats;