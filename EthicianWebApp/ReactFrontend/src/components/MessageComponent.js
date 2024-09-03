import React from 'react';
import userIcon from './user-icon.png';
import agentIcon from './agent-icon.png';

const Message = ({ speaker, text, output }) => {
  const speakerIcon = speaker === 'user' ? userIcon : agentIcon;
  const speakerName = speaker === 'user' ? 'User' : 'Agent';

  const messageStyle = speaker === 'user' ? 'user-message' : 'agent-message';
  const alignmentStyle = speaker === 'user' ? 'align-right' : 'align-left';

  const renderOutput = typeof output === 'string' || typeof output === 'number' ? output : null;

  return (
    <div className={`message-container ${alignmentStyle}`}>
      {speaker === 'agent' && (
        <div className="speaker-info">
          <div className="speaker-name">{speakerName}</div>
          <img src={speakerIcon} className="speaker-icon" alt={`${speakerName} Icon`} />
        </div>
      )}
      <div className={`message-bubble ${messageStyle}`}>
        <div className="message-text">{text}</div>
        {renderOutput && <div className="message-result">{renderOutput}</div>}
      </div>
    </div>
  );
};

export default Message;