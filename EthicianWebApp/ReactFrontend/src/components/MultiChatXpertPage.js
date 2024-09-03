import React, { useState } from 'react';
import './MultiChatXpertPage.css';
import ChatEditor from './ChatEditor';
import ConvoContainer from './ConvoContainer'; // Adjust the import path if necessary

function MyUI() {
  const [messages, setMessages] = useState([]);
  const [buttonStates, setButtonStates] = useState(Array(15).fill(false));
  const [selectedOption, setSelectedOption] = useState("GPT-4o"); // Add state for selected option

  const handleSendMessage = async (message, file) => {
    try {
      // Add user's message to messages state
      const newUserMessage = {
        text: message,
        sender: 'user',
      };
      setMessages([...messages, newUserMessage]);
  
      const formData = new FormData();
      formData.append('text', message);
      if (file) {
        formData.append('file', file);
      }
  
      // Adding selected experts to the formData
      const selectedExperts = buttonStates.reduce((acc, state, index) => {
        if (state) {
          acc.push(index);
        }
        return acc;
      }, []);
      formData.append('selected_experts', JSON.stringify(selectedExperts));
  
      // Send selected option to backend
      formData.append('selected_option', selectedOption);
  
      // Fetch CSRF token from cookie
      const csrfToken = document.cookie.match(/csrftoken=([^ ;]+)/)[1];
  
      const response = await fetch('http://localhost:3000/multichatxpert', {
        method: 'POST',
        headers: {
          'X-CSRFToken': csrfToken, // Include CSRF token in headers
        },
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const responseData = await response.json();
      console.log('Agent Response:', responseData.result); // Log agent's response
  
      // Add agent's response to messages state
      const newAgentMessage = {
        text: responseData.result, // Assuming the result contains the agent's response
        sender: 'agent',
      };
      console.log('New Agent Message:', newAgentMessage); // Log new agent message
      setMessages([...messages, newAgentMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        text: message,
        sender: 'agent',
        result: 'Error occurred in Multi, please try again.',
      };
      setMessages([...messages, errorMessage]);
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleButtonClick = (index) => {
    setButtonStates((prevButtonStates) => {
      const newButtonStates = [...prevButtonStates];
      newButtonStates[index] = !newButtonStates[index]; // Toggle button state
      return newButtonStates;
    });
  };

  const generateButtonMatrix = () => {
    return [
      { index: 0, expert: "Ethician" },
      { index: 1, expert: "Mechanical Engineer" },
      { index: 2, expert: "Metallurgist" },
      { index: 3, expert: "Safety Engineer" },
      { index: 4, expert: "Materials Engineer" },
      { index: 5, expert: "Robotics Engineer" },
      { index: 6, expert: "Electrical Engineer" },
      { index: 7, expert: "Civil Engineer" },
      { index: 8, expert: "Software Engineer" },
      { index: 9, expert: "Chemical Engineer" },
      { index: 10, expert: "Aerospace Engineer" },
      { index: 11, expert: "Petroleum Engineer" },
      { index: 12, expert: "Biomedical Engineer" },
      { index: 13, expert: "Environment Engineer" },
      { index: 14, expert: "Quality Engineer" }
    ].map(({ index, expert }) => (
      <button
        key={index}
        className={`expert-button ${buttonStates[index] ? 'active' : ''}`}
        onClick={() => {
          handleButtonClick(index);
          // Set bXEnabled variable (you can adjust the name if needed)
          const bXEnabled = buttonStates[index];
          console.log(`b${index + 1}Enabled:`, bXEnabled);
        }}
      >
        {expert}
      </button>
    ));
  };

  return (
    <div className="my-ui">
      <div className="output-box">
        <ConvoContainer messages={messages} />
      </div>

      <div className="editor-buttons">
        <ChatEditor onSendMessage={handleSendMessage} />
      </div>

      <div className="button-container">
        <div className="button-matrix">
          <div className="button-row">
            {generateButtonMatrix().slice(0, 5)}
          </div>
          <div className="button-row">
            {generateButtonMatrix().slice(5, 10)}
          </div>
          <div className="button-row">
            {generateButtonMatrix().slice(10, 15)}
          </div>
        </div>

        <div className="right-buttons">
          <button className="right-button">Edit TTS</button>
          <button className="right-button">Edit Vision (Coming Soon!)</button>
          <div className="dropdown">
            <select value={selectedOption} onChange={handleOptionChange}>
              <option value="GPT-4o">GPT-4o</option>
              <option value="Google Gemini">Google Gemini</option>
              <option value="Claude">Claude</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyUI;