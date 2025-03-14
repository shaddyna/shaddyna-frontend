'use client';

import { useState, useRef, useEffect } from 'react';
import { FullMessageType } from '@/types';
import useConversation from '@/hooks/useConversation';
import MessageBox from './MessageBox';
import axios from 'axios';
import { pusherClient } from '@/libs/pusher';
import { find } from 'lodash';

interface BodyProps {
  initialMessages: FullMessageType[];
}

const Body: React.FC<BodyProps> = ({ initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  useEffect(() => {
    pusherClient.subscribe(conversationId);
    bottomRef?.current?.scrollIntoView();

    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`);

      setMessages((prevMessages) => {
        if (find(prevMessages, { id: message.id })) return prevMessages;
        return [...prevMessages, message];
      });

      bottomRef?.current?.scrollIntoView();
    };

    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((prevMessages) =>
        prevMessages.map((message) => {
          if (message.id === newMessage.id) return newMessage;
          return message;
        })
      );
    };

    pusherClient.bind('messages:new', messageHandler);
    pusherClient.bind('message:update', updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind('messages:new', messageHandler);
      pusherClient.bind('messages:update', updateMessageHandler);
    };
  }, [conversationId]);

  return (
    <div className="flex-1 bg-white overflow-y-auto">
      {messages.map((message, i) => (
        <MessageBox
          isLast={i === messages.length - 1}
          key={message.id}
          data={message}
        />
      ))}

      <div ref={bottomRef} className="pt-24" />
    </div>
  );
};
export default Body;
