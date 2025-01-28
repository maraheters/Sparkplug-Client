import { useEffect } from "react";

export const useAutosizeTextArea = (textAreaRef: HTMLTextAreaElement | null, value: string) => {
    useEffect(() => {
      if (textAreaRef) {
        // Reset height to auto for accurate scrollHeight computation
        textAreaRef.style.height = 'auto';
        textAreaRef.style.height = `${textAreaRef.scrollHeight}px`;
      }
    }, [textAreaRef, value]);
  };