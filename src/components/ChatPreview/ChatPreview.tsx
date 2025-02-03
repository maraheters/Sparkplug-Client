import { ChatWithMessages, Message, User } from "../../api/sparkplugModels";
import styles from "./ChatPreview.module.scss"
import fallbackImage from "../../images/car-svgrepo-com.svg";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

interface Props {
    chat: ChatWithMessages;
    selected?: boolean;
    handleClicked: (chatId: string) => void;
}

function ChatPreview( {chat, selected = false, handleClicked} : Props) {
    const [lastMessage, setLastMessage] = useState<Message | null>(null)
    const [otherUser, setOtherUser] = useState<User>();
    const {userAuth} = useAuth();
    
    useEffect(() => {
        if(chat.messages.length > 0) {
            setLastMessage(chat.messages[chat.messages.length - 1]);
        }

        if(userAuth) {
            if(userAuth.id != chat.buyer.id ) {
                setOtherUser(chat.buyer)
            } else {
                setOtherUser(chat.seller);
            }
        }

    }, [chat]);

    return(
        <div className={selected 
                            ? `${styles.chatPreviewContainer} ${styles.selected}` 
                            : `${styles.chatPreviewContainer}`} 
            onClick={() => handleClicked(chat.chatId)}>
                
            <figure>
                {otherUser?.profilePicture
                    ? (<img src={otherUser?.profilePicture} onError={(e) => (e.currentTarget.src = fallbackImage)}></img>)
                    : (<img src={fallbackImage}></img>)}
                
            </figure>
            <div className={styles.nameAndContentContainer}>
                <h1>{otherUser?.username}</h1>
                {lastMessage && (<p>{(lastMessage?.senderUsername === userAuth?.username) ? "You" : lastMessage.senderUsername}: {lastMessage?.content}</p>)}
            </div>
        </div>
    )
}

export default ChatPreview;