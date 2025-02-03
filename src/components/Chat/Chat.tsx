import { useEffect, useState } from 'react';
import { ChatWithMessages, Message, Posting, User } from '../../api/sparkplugModels';
import MessageBubble from '../MessageBubble/MessageBubble';
import MessageInput from '../MessageInput/MessageInput';
import styles from './Chat.module.scss';
import { fetchPostingById } from '../../api/sparkplugApi';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface Props {
    handleSubmit: (text: string) => void;
    chatWithMessages: ChatWithMessages;
}

function Chat({ handleSubmit, chatWithMessages }: Props) {
    const [messages, setMessages] = useState<Message[]>([]); // Start with an empty array
    const [posting, setPosting] = useState<Posting | null>(null);
    const [otherUser, setOtherUser] = useState<User | null>(null);
    const {userAuth} = useAuth();

    useEffect(() => {
        const setChatMessagesAndUser = async () => {
            if (chatWithMessages.messages) { 
                setMessages(chatWithMessages.messages);
            }
    
            if(userAuth) {
                if(userAuth.id != chatWithMessages.buyer.id ) {
                    setOtherUser(chatWithMessages.buyer)
                } else {
                    setOtherUser(chatWithMessages.seller);
                }
            }
        }

        const getPosting = async () => {
            if(chatWithMessages) {
                try{
                    const data = await fetchPostingById(chatWithMessages.postingId);
                    console.log(data);
                    setPosting(data);
                } catch (e) {
                    console.error(e)
                }
            }
        }

        setChatMessagesAndUser();
        getPosting();
    }, [chatWithMessages]);

    const messageList = messages.map((m, i) => 
        <MessageBubble key={i} message={m} /> 
    );

    console.log(chatWithMessages);

    return (
        <div className={styles.chatContainer}>
            <div className={styles.chatNameContainer}>
                <h1>{otherUser?.username}</h1>
                {posting && (<Link to={'/postings/' + posting?.id}>
                    {posting.car.year} {posting.car.manufacturer.name} {posting.car.model}</Link>)}
            </div>

            <div className={styles.messagesContainer}>
                {messageList.length > 0 ? messageList : <div>No messages yet.</div>}
            </div>

            <div className={styles.inputContainer}>
                <MessageInput onSubmit={handleSubmit} />
            </div>
        </div>
    );
}

export default Chat;