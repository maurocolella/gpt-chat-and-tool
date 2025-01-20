'use client';

import { Message, useChat } from 'ai/react';
import { useEffect } from 'react';

type ColorMappings = Record<Message["role"], {
  text?: string,
  border?: string,
  bg?: string,
}>

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    initialMessages: [
      {
        id: 'dummy',
        role: 'system',
        content: `Act as a specialized assistant named Franky for a demonstration at Mellenger. Keep things simple and friendly.`,
      }
    ]
  });

  // Log messages to console
  useEffect(() => {
    console.log({ messages });
  }, [messages]);

  // Define color mappings
  const colors: ColorMappings = {
    'user': {
      text: 'text-cyan-200',
      border: 'border-cyan-700',
      bg: 'bg-cyan-900',
    },
    'assistant': {
      text: 'text-green-200',
      border: 'border-green-800',
      bg: 'bg-green-900',
    },
    'system': {
      text: 'text-zinc-600',
      border: 'border-zinc-800',
      bg: 'bg-zinc-900',
    },
    'data': {},
  };

  return (
    <div className="flex flex-1 flex-col w-full max-w-lg pt-8 mx-auto h-[100vh]">
      <div className="flex-1 overflow-y-auto pb-4">
        {messages.map(m => (
          <div
            key={m.id}
            className={`
              whitespace-pre-wrap
              p-4
              my-2
              rounded-md
              border
              ${Object.values(colors[m.role]).join(' ')}`}
          >
            {m.role + `: `}
            {m.content}
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full mb-8 border border-gray-300 rounded shadow-xl"
      >
        <input
          className="w-full p-2 text-black"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
