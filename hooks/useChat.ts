/*import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

interface Message {
  sender: string;
  receiver: string;
  content: string;
}

const useSocket = (sender: string, receiver: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!sender || !receiver) return;

    const socketIo = io('http://localhost:5000', {
      transports: ['websocket', 'polling'],
    });

    setSocket(socketIo);

    // Join a unique room for this specific conversation
    socketIo.emit('joinRoom', `${sender}_${receiver}`);

    socketIo.on('receiveMessage', (data: Message) => {
      if (data.receiver === receiver) {
        setMessages((prevMessages) => [...prevMessages, data]);
      }
    });

    // Cleanup: leave room when component unmounts
    return () => {
      socketIo.emit('leaveRoom', `${sender}_${receiver}`);
      socketIo.disconnect();
    };
  }, [sender, receiver]);

  const sendMessage = (content: string) => {
    if (socket) {
      // Emit message with acknowledgment
      socket.emit('sendMessage', { sender, receiver, content }, (response: { status: string, data: Message }) => {
        if (response.status === 'success') {
          setMessages((prevMessages) => [...prevMessages, response.data]);
        }
      });
    }
  };

  return { sendMessage, messages };
};

export default useSocket;*/

/*import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

interface Message {
  _id: any;
  sender: string;
  receiver: string;
  content: string;
}

const useSocket = (sender: string, receiver: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!sender || !receiver) return;

    // Ensure that socket connection is only made once per conversation
    const socketIo = io('http://localhost:5000', {
      transports: ['websocket', 'polling'],
    });

    setSocket(socketIo);

    // Join the room once, based on sender and receiver
    socketIo.emit('joinRoom', `${sender}_${receiver}`);

    // Listen for new messages
    socketIo.on('receiveMessage', (data: Message) => {
      console.log('Received message:', data);
      // Only update messages if the receiver is the correct one
      if (data.receiver === receiver) {
        setMessages((prevMessages) => {
          // Prevent adding duplicate messages
          if (!prevMessages.some((msg) => msg._id === data._id)) {
            return [...prevMessages, data];
          }
          return prevMessages;
        });
      }
    });

    // Cleanup when component unmounts or sender/receiver change
    return () => {
      socketIo.emit('leaveRoom', `${sender}_${receiver}`);
      socketIo.disconnect();
    };
  }, [sender, receiver]);

  const sendMessage = (content: string) => {
    if (socket) {
      // Emit message with acknowledgment
      console.log('Sending message:', { sender, receiver, content });
      socket.emit(
        'sendMessage',
        { sender, receiver, content },
        (response: { status: string; data: Message }) => {
          console.log('Send message response:', response);
          if (response.status === 'success') {
            setMessages((prevMessages) => [...prevMessages, response.data]);
          } else {
            console.error('Failed to send message:', response);
          }
        }
      );
    }
  };

  return { sendMessage, messages };
};

export default useSocket;&*/

import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

interface Message {
  sender: string;
  receiver: string;
  content: string;
}

const useSocket = (sender: string, receiver: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!sender || !receiver) return;

    console.log(`Connecting to socket server at http://localhost:5000...`);

    const socketIo = io('http://localhost:5000', {
      transports: ['websocket', 'polling'],
    });

    setSocket(socketIo);

    // Join a unique room for this specific conversation
    console.log(`Joining room: ${sender}_${receiver}`);
    socketIo.emit('joinRoom', `${sender}_${receiver}`);

    socketIo.on('receiveMessage', (data: Message) => {
      console.log('Received message:', data);
      if (data.receiver === receiver) {
        console.log(`New message for receiver ${receiver}:`, data);
        setMessages((prevMessages) => [...prevMessages, data]);
      }
    });

    // Cleanup: leave room when component unmounts
    return () => {
      console.log(`Leaving room: ${sender}_${receiver}`);
      socketIo.emit('leaveRoom', `${sender}_${receiver}`);
      socketIo.disconnect();
      console.log('Disconnected from socket server');
    };
  }, [sender, receiver]);

  const sendMessage = (content: string) => {
    if (socket) {
      console.log(`Sending message from ${sender} to ${receiver}:`, content);
      // Emit message with acknowledgment
      socket.emit('sendMessage', { sender, receiver, content }, (response: { status: string, data: Message }) => {
        console.log('Message response:', response);
        if (response.status === 'success') {
          console.log('Message sent successfully:', response.data);
          setMessages((prevMessages) => [...prevMessages, response.data]);
        } else {
          console.error('Error sending message:', response);
        }
      });
    }
  };

  return { sendMessage, messages };
};

export default useSocket;



