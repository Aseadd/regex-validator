"use client";

import type React from "react";
import { useState } from "react";
import { Send } from "lucide-react";

interface JobFormProps {
  onSubmit: (input: string) => void;
}

const JobForm = ({ onSubmit }: JobFormProps) => {
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSubmit(input);
      setInput("");
    }
  };

  const examples = [
    {
      label: "Email",
      pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
    },
    {
      label: "URL",
      pattern:
        "^(https?:\\/\\/)?([\\da-z.-]+)\\.([a-z.]{2,6})([/\\w .-]*)*\\/?$",
    },
    { label: "Phone", pattern: "^\\+?[1-9]\\d{1,14}$" },
  ];

  const handleExampleClick = (pattern: string) => {
    setInput(pattern);
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h2 className="form-title">Validate a Regular Expression</h2>
        <p className="form-description">
          Enter a regex pattern to validate and see real-time results
        </p>
      </div>

      <form className="job-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="regex-input" className="form-label">
            Regular Expression Pattern
          </label>
          <div className={`input-container ${isFocused ? "focused" : ""}`}>
            <input
              id="regex-input"
              type="text"
              className="form-control"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="e.g. ^[a-zA-Z0-9]+$"
              spellCheck="false"
              autoComplete="off"
            />
          </div>
        </div>

        <div className="form-examples">
          <span className="examples-label">Examples:</span>
          {examples.map((example) => (
            <button
              key={example.label}
              type="button"
              className="example-button"
              onClick={() => handleExampleClick(example.pattern)}
            >
              {example.label}
            </button>
          ))}
        </div>

        <button
          type="submit"
          className="submit-button"
          disabled={!input.trim()}
        >
          <Send size={16} />
          <span>Validate</span>
        </button>
      </form>
    </div>
  );
};

export default JobForm;
