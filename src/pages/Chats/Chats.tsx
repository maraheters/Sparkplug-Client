import { useEffect, useState } from "react";
import { ChatWithMessages } from "../../api/sparkplugModels";
import ChatPreview from "../../components/ChatPreview/ChatPreview";
import Chat from "../../components/Chat/Chat";
import styles from './Chats.module.scss';
import { useChats } from "../../context/ChatsContext";

function Chats() {
    const [currentChat, setCurrentChat] = useState<ChatWithMessages | null>(null);
    const { chatsWithMessages , sendMessage} = useChats();

    useEffect(() => {
        if(currentChat) {
            const newChat = chatsWithMessages.find(c => c.chatId === currentChat.chatId);
            console.log(newChat);
            if(newChat) {
                setCurrentChat( newChat );
            }
        } else {
            if(chatsWithMessages.length > 0) {
                setCurrentChat(chatsWithMessages[chatsWithMessages.length - 1]);
            }
        }
    }, [chatsWithMessages]);

    const handleSendMessage = async (message: string) => {
        if (message.trim() && currentChat) {
            await sendMessage(message, currentChat.chatId);
        }
    };

    const handleCurrentChatChange = (chatId: string) => {
        const selectedChat = chatsWithMessages.find(c => c.chatId === chatId) || null;
        setCurrentChat(selectedChat);
    };

    const chatList = chatsWithMessages
        .map(c => (
                <ChatPreview 
                    key={c.chatId} 
                    selected={c.chatId === currentChat?.chatId}
                    handleClicked={handleCurrentChatChange} 
                    chat={c} />
            ))
        .reverse();

    return (
        <div className={styles.chatListAndChatContainer}>
            <div className={styles.chatListContainer}>
                {chatList}
            </div>
            
            {currentChat && (<Chat handleSubmit={handleSendMessage} chatWithMessages={currentChat} />)}
        </div>
    );
}

export default Chats;