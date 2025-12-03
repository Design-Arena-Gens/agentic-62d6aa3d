import { FormEvent, useState } from "react";

interface ComposerProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function Composer({ onSend, disabled = false }: ComposerProps) {
  const [draft, setDraft] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed) {
      return;
    }

    onSend(trimmed);
    setDraft("");
  };

  return (
    <div className="composer">
      <form onSubmit={handleSubmit}>
        <textarea
          aria-label="Type a message"
          placeholder="Say anything…"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          disabled={disabled}
        />
        <button type="submit" disabled={disabled || draft.trim().length === 0}>
          <span>Send</span>
        </button>
      </form>
    </div>
  );
}
