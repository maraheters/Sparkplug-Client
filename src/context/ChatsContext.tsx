import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { fetchChats, sendMessage as sendMessageApi } from '../api/sparkplugMessagingApi';
import { ChatWithMessages } from '../api/sparkplugModels';
import { useSubscription } from 'react-stomp-hooks';

interface ChatsContextType {
    chatsWithMessages: ChatWithMessages[];
    sendMessage: (message: string, chatId: string) => Promise<Date>;
}

const ChatsContext = createContext<ChatsContextType | undefined>(undefined);

type Props = { children: React.ReactNode }

export const ChatsProvider = ({ children } : Props) => {
    const { userAuth } = useAuth();
    const [chatsWithMessages, setChatsWithMessages] = useState<ChatWithMessages[]>([]);

    useEffect(() => {
        const getChats = async () => {
            try {
                const data = await fetchChats(userAuth?.authToken!);
                setChatsWithMessages(data);
            } catch (e) {
                console.error(e);
            }
        };

        if (chatsWithMessages.length < 1) {
            getChats();
        }
    }, [userAuth, chatsWithMessages.length]);

    useSubscription('/topic/messages/' + userAuth?.id, (message) => {
        const receivedMessage = JSON.parse(message.body);
        const { chatId, message: newMessage } = receivedMessage;

        //if message comes to a new chat, trigger useEffect for re-fetch
        if(!chatsWithMessages.find(c => c.chatId === chatId)){ 
            setChatsWithMessages([]);
            return;
        }

        setChatsWithMessages((prevChats) => {
            console.log(prevChats);
            const updatedChats = prevChats.map(chat => {
                if (chat.chatId === chatId) {
                    return {
                        ...chat,
                        messages: [...chat.messages, newMessage],
                    };
                }
                return chat;
            });
            console.log(updatedChats);
            return updatedChats;
        });

    });

    const sendMessage = async (message: string, chatId: string): Promise<Date> => {
        if (userAuth) {
            try {
                const sentAt = await sendMessageApi(userAuth.authToken, chatId, message);
                const newMessageObject = {
                    senderId: userAuth.id,
                    senderUsername: userAuth.username,
                    content: message,
                    createdAt: sentAt,
                    read: false
                };

                setChatsWithMessages((prevChats) => {

                    //Find the chat where message was sent to,
                    //then add the new (sent) message to the array of its messages
                    const updatedChats = prevChats.map(prevChat => {
                        if (prevChat.chatId === chatId) {
                            return {
                                ...prevChat,
                                messages: [...prevChat.messages, newMessageObject],
                            };
                        }
                        return prevChat;
                    });
                    return updatedChats;
                });

                return sentAt;
            } catch (e) {
                throw e;
            }
        }
        throw new Error("Not authenticated");
    };

    return (
        <ChatsContext.Provider value={{ chatsWithMessages, sendMessage }}>
            {children}
        </ChatsContext.Provider>
    );
};

export const useChats = () => {
    const context = useContext(ChatsContext);
    if (!context) {
        throw new Error('useChats must be used within a ChatsProvider');
    }
    return context;
};