import React from 'react';
import './ConvoContainer.css';
import Message from './MessageComponent';

const ConvoContainer = ({ messages }) => {
  return (
    <div className="conversation-container">
      {messages.map((message, index) => (
        <div key={index} className={`message-container ${message.sender === 'user' ? 'align-right' : 'align-left'}`}>
          {message.sender === 'user' ? (
            <Message
              speaker={message.sender}
              text={message.text}
            />
          ) : (
            <Message
              speaker={message.sender}
              text={message.text}
              output={message.result}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ConvoContainer;