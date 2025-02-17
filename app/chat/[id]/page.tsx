/*'use client';
import React, { useState, useEffect } from 'react';
import useSocket from '@/hooks/useChat';

const ChatPage = () => {
  const [receiverId, setReceiverId] = useState<string | null>(null);
  const [sender, setSender] = useState<string | null>(null);
  const [messages, setMessages] = useState<{ sender: string; receiver: string; content: string }[]>([]);
  const [newMessage, setNewMessage] = useState(''); 

  // Extract receiver ID from URL
  useEffect(() => {
    console.log('Extracting receiverId from URL...');
    const urlParts = window.location.pathname.split('/');
    const extractedReceiverId = urlParts[urlParts.length - 1];

    console.log('Extracted Receiver ID:', extractedReceiverId);
    setReceiverId(extractedReceiverId);
  }, []);

  // Check for authentication token and set sender ID
  useEffect(() => {
    console.log('Checking localStorage for authToken...');
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      try {
        const decodedToken = JSON.parse(atob(storedToken.split('.')[1]));
        console.log('Decoded Token:', decodedToken);
        if (decodedToken.id) {
          setSender(decodedToken.id);
          console.log('Sender ID set:', decodedToken.id);
        }
      } catch (error) {
        console.error('Error decoding authToken:', error);
      }
    }
  }, []);

  // Fetch messages when sender and receiver are set
  useEffect(() => {
    if (!sender || !receiverId) {
      console.log('Waiting for sender and receiverId...');
      return;
    }

    console.log(`Fetching messages for sender: ${sender} and receiver: ${receiverId}`);

    const fetchMessages = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/chat/${sender}/${receiverId}`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        console.log('Fetched messages:', data);
        setMessages(data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [sender, receiverId]);

  // Initialize socket connection
  const { sendMessage, messages: socketMessages } = useSocket(sender ?? '', receiverId ?? '');

  useEffect(() => {
    console.log('Socket messages updated:', socketMessages);
    if (socketMessages.length > 0) {
      setMessages((prev) => [...prev, ...socketMessages]);
      console.log('UI updated with new socket messages');
    }
  }, [socketMessages]);

  // Handle sending a message
  const handleSendMessage = async () => {
    if (newMessage.trim() && sender && receiverId) {
      console.log('Sending message:', newMessage);

      const messageObject = { sender, receiver: receiverId, content: newMessage };

      try {
        // Send message to backend API to save it in DB and then broadcast via socket
        const response = await fetch('http://localhost:5000/api/chat/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(messageObject),
        });

        if (response.ok) {
          console.log('Message sent and saved');
          setMessages((prev) => [...prev, messageObject]); // Optimistically update UI
        } else {
          console.error('Failed to send message');
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }

      setNewMessage(''); // Clear input after sending
    } else {
      console.warn('Message not sent. Ensure sender and receiverId are set.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Chat with {receiverId}</h2>
      <div className="space-y-4">
        {messages.map((message, index) => (
          <div key={index} className="flex justify-between items-center p-4 border-b">
            <span>
              {message.sender === sender ? 'You' : message.sender}: {message.content}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="p-2 border rounded w-full"
          placeholder="Type a message"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white p-2 rounded ml-2"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;*/





/*'use client';
import React, { useState, useEffect } from 'react';
import useSocket from '@/hooks/useChat';

const ChatPage = () => {
  const [receiverId, setReceiverId] = useState<string | null>(null);
  const [sender, setSender] = useState<string | null>(null);
  const [messages, setMessages] = useState<{ sender: string; receiver: string; content: string }[]>([]);
  const [newMessage, setNewMessage] = useState(''); 

  // Extract receiverId from URL
  useEffect(() => {
    console.log('Extracting receiverId from URL...');
    const urlParts = window.location.pathname.split('/');
    const extractedReceiverId = urlParts[urlParts.length - 1];

    console.log('Extracted Receiver ID:', extractedReceiverId);
    setReceiverId(extractedReceiverId);
  }, []);

  // Check for authentication token and set sender ID
  useEffect(() => {
    console.log('Checking localStorage for authToken...');
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      try {
        const decodedToken = JSON.parse(atob(storedToken.split('.')[1]));
        console.log('Decoded Token:', decodedToken);
        if (decodedToken.id) {
          setSender(decodedToken.id);
          console.log('Sender ID set:', decodedToken.id);
        }
      } catch (error) {
        console.error('Error decoding authToken:', error);
      }
    }
  }, []);

  // Fetch messages when sender and receiver are set
  useEffect(() => {
    if (!sender || !receiverId) {
      console.log('Waiting for sender and receiverId...');
      return;
    }

    console.log(`Fetching messages for sender: ${sender} and receiver: ${receiverId}`);

    const fetchMessages = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/chat/${sender}/${receiverId}`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        console.log('Fetched messages:', data);
        setMessages(data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [sender, receiverId]);

  // Initialize socket connection
  const { sendMessage, messages: socketMessages } = useSocket(sender ?? '', receiverId ?? '');

  useEffect(() => {
    console.log('Socket messages updated:', socketMessages);
    if (socketMessages.length > 0) {
      setMessages((prev) => [...prev, ...socketMessages]);
      console.log('UI updated with new socket messages');
    }
  }, [socketMessages]);

  // Handle sending a message
  const handleSendMessage = async () => {
    if (newMessage.trim() && sender && receiverId) {
      console.log('Sending message:', newMessage);

      const messageObject = { sender, receiver: receiverId, content: newMessage };

      try {
        // Send message to backend API to save it in DB and then broadcast via socket
        const response = await fetch('http://localhost:5000/api/chat/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(messageObject),
        });

        if (response.ok) {
          console.log('Message sent and saved');
          setMessages((prev) => [...prev, messageObject]); // Optimistically update UI
        } else {
          console.error('Failed to send message');
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }

      setNewMessage(''); // Clear input after sending
    } else {
      console.warn('Message not sent. Ensure sender and receiverId are set.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Chat with {receiverId}</h2>
      <div className="space-y-4">
        {messages.map((message, index) => {
          console.log(`Message sender: ${message.sender}, Local sender: ${sender}`);
          return (
            <div key={index} className="flex justify-between items-center p-4 border-b">
              <span>
                {message.sender === sender ? 'You' : message.sender}: {message.content}
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="p-2 border rounded w-full"
          placeholder="Type a message"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white p-2 rounded ml-2"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;*/


'use client';
import React, { useState, useEffect } from 'react';
import useSocket from '@/hooks/useChat'; // Ensure useSocket provides real-time updates
import Back from '@/components/Back';
import BottomNavigationBar from '@/components/BottomNav';
import Footer from '@/components/Footer';

const ChatPage = () => {
  const [receiverId, setReceiverId] = useState<string | null>(null);
  const [sender, setSender] = useState<string | null>(null);
  const [messages, setMessages] = useState<{ sender: string; receiver: string; content: string }[]>([]);
  const [newMessage, setNewMessage] = useState(''); 

  // Extract receiverId from URL
  useEffect(() => {
    console.log('Extracting receiverId from URL...');
    const urlParts = window.location.pathname.split('/');
    const extractedReceiverId = urlParts[urlParts.length - 1];

    console.log('Extracted Receiver ID:', extractedReceiverId);
    setReceiverId(extractedReceiverId);
  }, []);

  // Check for authentication token and set sender ID
  useEffect(() => {
    console.log('Checking localStorage for authToken...');
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      try {
        const decodedToken = JSON.parse(atob(storedToken.split('.')[1]));
        console.log('Decoded Token:', decodedToken);
        if (decodedToken.id) {
          setSender(decodedToken.id);
          console.log('Sender ID set:', decodedToken.id);
        }
      } catch (error) {
        console.error('Error decoding authToken:', error);
      }
    }
  }, []);

  // Fetch messages when sender and receiver are set
  useEffect(() => {
    if (!sender || !receiverId) {
      console.log('Waiting for sender and receiverId...');
      return;
    }

    console.log(`Fetching messages for sender: ${sender} and receiver: ${receiverId}`);

    const fetchMessages = async () => {
      try {
        const response = await fetch(`https://shaddyna-backend.onrender.com/api/chat/${sender}/${receiverId}`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        console.log('Fetched messages:', data);
        setMessages(data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [sender, receiverId]);

  // Initialize socket connection and listen for incoming messages
  const { sendMessage, messages: socketMessages } = useSocket(sender ?? '', receiverId ?? '');

  useEffect(() => {
    console.log('Socket messages updated:', socketMessages);
    if (socketMessages.length > 0) {
      // When a new message comes in through the socket, update the state immediately
      setMessages((prev) => [...prev, socketMessages[socketMessages.length - 1]]);
      console.log('UI updated with new socket messages');
    }
  }, [socketMessages]); // Listen to the incoming socket messages

  // Handle sending a message
  const handleSendMessage = async () => {
    if (newMessage.trim() && sender && receiverId) {
      console.log('Sending message:', newMessage);

      const messageObject = { sender, receiver: receiverId, content: newMessage };

      try {
        // Send message to backend API to save it in DB and then broadcast via socket
        const response = await fetch('https://shaddyna-backend.onrender.com/api/chat/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(messageObject),
        });

        if (response.ok) {
          console.log('Message sent and saved');
          setMessages((prev) => [...prev, messageObject]); // Optimistically update UI
        } else {
          console.error('Failed to send message');
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }

      setNewMessage(''); // Clear input after sending
    } else {
      console.warn('Message not sent. Ensure sender and receiverId are set.');
    }
  };

  return (
    <div>
      <Back title={'Conversation'} />
    <div className="p-4">
      <h2 className="text-2xl mb-4">Chat with {receiverId}</h2>
      <div className="space-y-4">
        {messages.map((message, index) => {
         // console.log(`Message sender: ${message.sender}, Local sender: ${sender}`);
          return (
            <div key={index} className="flex justify-between items-center p-4 border-b">
              <span>
                {message.sender === sender ? 'You' : message.sender}: {message.content}
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="p-2 border rounded w-full"
          placeholder="Type a message"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white p-2 rounded ml-2"
        >
          Send
        </button>
      </div>
    </div>
    
    </div>
  );
};

export default ChatPage;





