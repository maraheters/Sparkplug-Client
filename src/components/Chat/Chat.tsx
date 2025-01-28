import { useEffect, useState } from 'react';
import { ChatWithMessages, Message, Posting } from '../../api/sparkplugModels';
import MessageBubble from '../MessageBubble/MessageBubble';
import MessageInput from '../MessageInput/MessageInput';
import styles from './Chat.module.scss';
import { fetchPostingById } from '../../api/sparkplugApi';
import { Link } from 'react-router-dom';

interface Props {
    handleSubmit: (text: string) => void;
    chatWithMessages: ChatWithMessages | null;
}

function Chat({ handleSubmit, chatWithMessages }: Props) {
    const [messages, setMessages] = useState<Message[]>([]); // Start with an empty array
    // const [posting, setPosting] = useState<Posting | null>(null);

    useEffect(() => {
        if (chatWithMessages?.messages) { 
            setMessages(chatWithMessages.messages);
        }
    }, [chatWithMessages]);

    // useEffect(() => {
    //     const getPosting = async () => {
    //         if(chatWithMessages) {
    //             try{
    //                 const data = await fetchPostingById(chatWithMessages.postingId);
    //                 console.log(data);
    //                 setPosting(data);
    //             } catch (e) {
    //                 console.error(e)
    //             }
    //         }
    //     }

    //     getPosting();
    // },[])

    const messageList = messages.map((m, i) => 
        <MessageBubble key={i} message={m} /> 
    );

    console.log(chatWithMessages);

    return (
        chatWithMessages ? (
            <div className={styles.chatContainer}>
                <div className={styles.chatNameContainer}>
                    <h1>{chatWithMessages.chatName}</h1>
                    {/* {posting && (<Link to={'/postings/' + posting?.id}>{posting.car.model}</Link>)} */}
                </div>

                <div className={styles.messagesContainer}>
                    {messageList.length > 0 ? messageList : <div>No messages yet.</div>}
                </div>

                <div className={styles.inputContainer}>
                    <MessageInput onSubmit={handleSubmit} />
                </div>
            </div>
        ) : (
            <div>Your chats here</div>
        )
    );
}

export default Chat;