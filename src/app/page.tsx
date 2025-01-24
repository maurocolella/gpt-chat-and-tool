'use client';

import { Weather, WeatherAtLocation } from '@/components/weather';
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
        id: '0',
        role: 'system',
        content: `Act as a specialized assistant named Franky for a demonstration at Mellenger. Keep it simple, friendly, and throw in lots of emojis.`,
      }
    ]
  });

  // Log messages to console
  useEffect(() => {
    console.log({ messages });
  }, [messages]);

  // Define color mappings
  const colorMap: ColorMappings = {
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
        {messages.map(message => {

          // If the message has a tool invocation attached
          if (
            message.toolInvocations &&
            message.toolInvocations.length > 0 &&
            // Verify that it is a result
            message.toolInvocations[0].state === 'result') {

            // Return the weather component
            return <Weather
              key={message.id}
              weatherAtLocation={message.toolInvocations[0].result as WeatherAtLocation}
            />
          }

          // Otherwise, pick the right color to decorate the message
          const colors = Object.values(colorMap[message.role]).join(' ')

          // Decorate and return
          return (
            <div
              key={message.id}
              className={`
                whitespace-pre-wrap
                p-4
                my-2
                rounded-md
                border
                ${colors}
              `}>
              <span className={`
                px-2 py-1
                mr-2
                rounded
                border
                font-bold
                shadow-lg
                ${colors}
            `}>
                {message.role}
              </span>
              {message.content}
            </div>
          )
        })}
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
