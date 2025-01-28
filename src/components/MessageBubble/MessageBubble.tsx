import { Message } from "../../api/sparkplugModels";
import { useAuth } from "../../context/AuthContext";
import { formatDateTime } from "../../utils/utils";
import styles from './MessageBubble.module.scss'

interface Props {
    message: Message;
}

function MessageBubble( {message} : Props) {
    const {userAuth} = useAuth();

    return(
        <div className={(userAuth?.username === message.senderUsername)
                            ? `${styles.messageBubbleContainer} ${styles.current}` 
                            : styles.messageBubbleContainer}>
            {/* <figure>
                <img src='' onError={(e) => (e.currentTarget.src = fallbackImage)}></img>
            </figure> */}
            <p>{message.content}</p>
            {/* <p>{formatDateTime(message.createdAt)}</p> */}
        </div>
    );
}

export default MessageBubble;