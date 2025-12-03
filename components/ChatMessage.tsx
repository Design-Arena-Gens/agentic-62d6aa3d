import clsx from "clsx";

export type ChatAuthor = "me" | "bot";

export interface ChatMessageProps {
  author: ChatAuthor;
  text: string;
  timestamp: string;
}

export function ChatMessage({ author, text, timestamp }: ChatMessageProps) {
  return (
    <article className={clsx("message", author)}>
      <div className="message-avatar">
        {author === "me" ? "You" : "AI"}
      </div>
      <div className="message-bubble">
        <p>{text}</p>
        <div className="message-timestamp">{timestamp}</div>
      </div>
    </article>
  );
}
