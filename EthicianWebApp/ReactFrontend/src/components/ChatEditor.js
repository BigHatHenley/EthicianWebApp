import React, { useState, useRef } from 'react';
import './ChatEditor.css'; // Import CSS for ChatEditor styling
import FileExplorer from './FileExplorer'; // Import the FileExplorer component

const ChatEditor = ({ onSendMessage }) => {
  const [inputText, setInputText] = useState('');
  const fileExplorerRef = useRef(null);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleFileSelect = (files) => {
    const file = files[0];
    onSendMessage('', file); // Send an empty message with the file
  };

  const openFileDialog = () => {
    fileExplorerRef.current.click(); // Trigger file input click
  };

  const handleSendMessage = () => {
    onSendMessage(inputText);
    setInputText(''); // Clear input after sending
    console.log("Sent Message to urls.py")
  };

  return (
    <div className="chat-editor">
      <div className="entry-container">
        <div className="entry-content">
          <div className="entry-text-container">
            <textarea
              className="entry-text"
              value={inputText}
              onChange={handleInputChange}
              placeholder="Enter your text here"
            />
          </div>
          <div className="entry-buttons">
            <button className="entry-button upload-button" onClick={openFileDialog} title="Upload File">
              <span className="material-icons">attach_file</span>
            </button>
            <button className="entry-button send-button" onClick={handleSendMessage} title="Send">
              <span className="material-icons">arrow_upward</span>
            </button>
          </div>
        </div>
      </div>

      <FileExplorer ref={fileExplorerRef} onFileSelect={handleFileSelect} />
    </div>
  );
};

export default ChatEditor;