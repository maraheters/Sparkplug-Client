
import toast from 'react-hot-toast';
import { initializeChat, sendMessage } from '../../api/sparkplugMessagingApi'
import { Posting } from '../../api/sparkplugModels';
import { useAuth } from '../../context/AuthContext';
import MessageInput from '../MessageInput/MessageInput'
import styles from './MessageWindow.module.scss'
import { Navigate, useNavigate } from 'react-router-dom';

interface Props {
    posting: Posting;
    onClose: () => void;
}

function MessageWindow({ posting, onClose }: Props) {
    const { userAuth } = useAuth();
    const navigate = useNavigate();

    const handleSend = async (text: string) => {
        if(!userAuth) {
            toast.error("You are not logged in.");
            return;
        }

        try {
            const chatId = await initializeChat(userAuth.authToken, posting.id);
            await sendMessage(userAuth.authToken, chatId, text);
            toast.success("Message sent!");
            navigate('/chats');
        } catch(e) {
            toast.error("Error sending message.");
        }

    }

    return (
        <div className={styles.messageWindow}>

            <div className={styles.messageWindowContainer}>
                <button onClick={onClose} className={styles.closeButton}>X</button>
                <div className={styles.imageAndUsername}>
                    <figure>
                        <img></img> {/*creator's pfp*/}
                    </figure>
                    <h1>{posting.creator}</h1>
                </div>

                <div className={styles.inputContainer}>

                    <MessageInput onSubmit={handleSend}/>

                </div>

            </div>
        </div>
    )
}

export default MessageWindow;