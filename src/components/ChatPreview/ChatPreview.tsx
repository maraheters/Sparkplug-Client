import { ChatWithMessages, Message } from "../../api/sparkplugModels";
import styles from "./ChatPreview.module.scss"
import fallbackImage from "../../images/car-svgrepo-com.svg";
import { useEffect, useState } from "react";

interface Props {
    chat: ChatWithMessages;
    previewUrl: string;
    handleClicked: (chatId: string) => void;
}

function ChatPreview( {chat, previewUrl, handleClicked} : Props) {
    const [lastMessage, setLastMessage] = useState<Message | null>(null)

    useEffect(() => {
        if(chat.messages.length > 0) {
            setLastMessage(chat.messages[chat.messages.length - 1]);
        }

    }, [chat]);

    return(
        <div className={styles.chatPreviewContainer} onClick={() => handleClicked(chat.chatId)}>
            <figure>
                <img src={previewUrl} onError={(e) => (e.currentTarget.src = fallbackImage)}></img>
            </figure>
            <div className={styles.nameAndContentContainer}>
                <h1>{chat.chatName}</h1>
                {lastMessage && (<p>{lastMessage?.senderUsername}: {lastMessage?.content}</p>)}
            </div>
        </div>
    )
}

export default ChatPreview;