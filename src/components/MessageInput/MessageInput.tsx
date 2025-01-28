import { useState } from 'react';
import styles from './MessageInput.module.scss'
import { Textarea } from '../Textarea/Textarea';

interface Props {
    onSubmit: (text: string) => void;
}

function MessageInput({onSubmit}: Props) {
    const [message, setMessage] = useState<string>('');

    

    const handleSend = () => {
        if (message.trim()) {
            onSubmit(message); // Call the callback with the message
            setMessage(''); // Clear the input after sending
        }
    };

    return (
        <div className={styles.messageInputContainer}>
            <Textarea
                placeholder='Message'
                value={message}
                onChange={e => setMessage(e.target.value)}
            ></Textarea>
            <button onClick={handleSend} >
                <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width='30px' height='30px' viewBox="0 0 792.68 726.84">
                    <path d="m785.36,332.18c-11.25-22.74-47.64-39.12-120.42-71.87L186.1,44.83C111.77,11.38,74.6-5.34,49.95,1.52,28.53,7.48,11.17,23.15,3.04,43.84c-9.34,23.83,3.5,62.51,29.18,139.89l47.29,142.51,130.94,15.95,174.47,21.24-174.47,21.24-129.7,15.79c-.07.23-.14.45-.23.69l-47.39,141.56c-25.97,77.54-38.94,116.3-29.63,140.17,8.09,20.74,25.46,36.45,46.89,42.44,24.69,6.89,61.96-9.89,136.53-43.44l478-215.09c72.77-32.76,109.17-49.13,120.42-71.88,9.76-19.75,9.76-42.95,0-62.71Z"/>
                </svg>
            </button>
        </div>
    )
}

export default MessageInput;