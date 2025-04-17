import { useState } from "react";

interface JobFormProps {
  onSubmit: (input: string) => void;
}

function JobForm({ onSubmit }: JobFormProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      onSubmit(input);
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter string to validate"
        required
      />
      <button type="submit">Validate</button>
    </form>
  );
}

export default JobForm;
