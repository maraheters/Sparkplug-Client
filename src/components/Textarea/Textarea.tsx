import { useRef } from "react";
import { useAutosizeTextArea } from "../../hooks/useAutosizeTextArea";
import styles from './Textarea.module.scss'

interface TextAreaProps {
    placeholder?: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    label?: string;
  }
  
  export function Textarea({ placeholder = '', value = '', onKeyDown, onChange, label }: TextAreaProps) {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    useAutosizeTextArea(textAreaRef.current, value);
  
    return (
      <>
        {label && (
          <label className={styles.label} htmlFor="textarea-id">
            {label}
          </label>
        )}
        <textarea
          ref={textAreaRef}
          id="textarea-id"
          className={styles.textarea}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          value={value}
          rows={1} // Start with one row
        />
      </>
    );
  }