import React, { useState, useEffect, useRef } from 'react';
import './MultiChatXpertPage.css';
import userImage from './images/personTyping.gif';
import aiImage from './images/AILooking.gif';
import axios from 'axios';
import Bowser from "bowser";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faClipboard, faPaperclip } from '@fortawesome/free-solid-svg-icons';


function MultiChatXpertPage() {
  const [messages, setMessages] = useState([]);
  const [isTTSEnabled, setTTSEnabled] = useState(false);
  const [isExpertPopupOpen, setExpertPopupOpen] = useState(false);
  const [experts, setExperts] = useState([
    "Ethician", "Mechanical Engineer", "Metallurgist", "Safety Engineer", "Materials Engineer",
    "Robotics Engineer", "Electrical Engineer", "Civil Engineer", "Software Engineer", "Chemical Engineer",
    "Aerospace Engineer", "Petroleum Engineer", "Biomedical Engineer", "Environment Engineer", "Quality Engineer"
  ]);
  const [availableExperts, setAvailableExperts] = useState(['Expert 1', 'Expert 2', 'Expert 3', 'Expert 4', 'Expert 5', 'Expert 6', 'Expert 7']);
  const [currentExpert, setCurrentExpert] = useState('Expert 1');
  const [selectedExperts, setSelectedExperts] = useState([]);
  const [currentLLM, setCurrentLLM] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false); // Track if edit popup is open
  const [currentExpertEdit, setCurrentExpertEdit] = useState(null); // Track current expert to edit
  const [newExpertName, setNewExpertName] = useState(""); // Track new expert name input
  
  // const [expertToggles, setExpertToggles] = useState(Array(15).fill(false));
  const [prompt, setPrompt] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [volume, setVolume] = useState(50); // Volume state

  // Check if the browser supports speech recognition
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;
  const browser = Bowser.getParser(window.navigator.userAgent);
  const isFirefox = browser.getBrowserName() === "Firefox";

  const [conversationHistory, setConversationHistory] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [newConversationText, setNewConversationText] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Assume initially logged out
  const [postCount, setPostCount] = useState(0);
  const [attachedFiles, setAttachedFiles] = useState([]);  // <-- Define attachedFiles here

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const csrfToken = getCsrfToken(); // Retrieve CSRF token function
        const response = await axios.get('https://ethician-django.onrender.com/api/get_conversations/', {
          withCredentials: true,
          headers: {
            'X-CSRFToken': csrfToken,
          },
        });
        setConversationHistory(response.data);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Error fetching conversation history:', error);
        setIsLoggedIn(false);
      }
    };
  
    fetchConversations();
  }, []);


  if (recognition) {
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setPrompt(transcript);  // Update the entry bar with the transcribed text
      console.log("Transcribed Text:", transcript);  // Log transcription to browser console
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);  // Error handling in console
      setIsListening(false);  // Reset listening state
    };

    recognition.onend = () => {
      console.log("Speech recognition ended.");  // Log end of recognition to browser console
      setIsListening(false);  // Ensure the recording state is reset
    };
  }

  // Updated `handleStartListening` function
  const handleStartListening = () => {
    if (isFirefox) {
        alert("Speech recognition is not supported on Firefox. Please use a different browser.");
        return;
    }
    if (recognition && !isListening) {
        setPrompt("");  // Clear any previous text in entry bar
        setIsListening(true);
        console.log("Starting Speech Recognition");  // Log to browser console
        recognition.start();
    }
  };

  // Updated `handleStopListening` function
  const handleStopListening = () => {
    if (recognition && isListening) {
        console.log("Stopping Speech Recognition");  // Log to browser console
        recognition.stop();
        setIsListening(false);  // Reset state so user can restart recording
    }
  };

  // Function to toggle TTS setting
  const toggleTTS = () => {
    setTTSEnabled(!isTTSEnabled);
    console.log("TTS Enabled:", !isTTSEnabled); // Log for confirmation
  };

  const toggleExpertPopup = () => {
    setExpertPopupOpen(!isExpertPopupOpen);
  };

  // Function to handle expert selection in the AI Image popup
  const handleExpertSelection = (expert) => {
    setSelectedExperts((prevExperts) => {
        const updatedExperts = prevExperts.includes(expert)
            ? prevExperts.filter((e) => e !== expert)
            : [...prevExperts, expert];
        console.log("Updated selectedExperts:", updatedExperts);  // Log after update
        return updatedExperts;
    });
  };

  const handleLLMSelection = (llm) => {
    setCurrentLLM(llm);
    console.log("Updated currentLLM:", llm);  // Log after update
  };

  const handleExpertChange = (newExpert) => {
    if (!isLoggedIn) {
      alert('Please log in to change experts.');
      return;
    }
    setCurrentExpert(newExpert);
  };

  const handleEditExpertClick = (index) => {
    setCurrentExpertEdit(index);
    setNewExpertName(experts[index]);
    setShowEditPopup(true);
  };
  
  const handleSaveExpertName = () => {
    const updatedExperts = [...experts];
    updatedExperts[currentExpertEdit] = newExpertName;
    setExperts(updatedExperts);
    setShowEditPopup(false);
  };

  function getCsrfToken() {
    const name = 'csrftoken';
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    // Restrict experts for logged-out users
    if (!token) {
      setAvailableExperts(availableExperts.slice(0, 5)); // Limit to 5 experts
    } else {
        setAvailableExperts([
            "Ethician", "Mechanical Engineer", "Metallurgist", "Safety Engineer", "Materials Engineer",
            "Robotics Engineer", "Electrical Engineer", "Civil Engineer", "Software Engineer", "Chemical Engineer",
            "Aerospace Engineer", "Petroleum Engineer", "Biomedical Engineer", "Environment Engineer", "Quality Engineer"
        ]);
    }
  }, []);

  const handleRestoreConversation = (conversationText) => {
    // Assuming conversationText is newline-delimited for each message
    const restoredMessages = conversationText.split('\n').map((text, idx) => ({
      text,
      isUser: idx % 2 === 0, // Toggle between user and AI messages for simplicity
    }));
    setMessages(restoredMessages);
  };

  const handleConversationSelect = async (conversationId) => {
    if (!isLoggedIn) {
        alert("You need to log in to view saved conversations.");
        return;
    }

    try {
        const response = await axios.get(
            `https://ethician-django.onrender.com/api/get_conversation/${conversationId}/`,
            {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            }
        );

        if (response.status === 200) {
            const conversation = response.data;
            setActiveConversationId(conversationId);
            handleRestoreConversation(conversation.conversation_text);
        }
    } catch (error) {
        console.error("Error fetching conversation:", error);
    }
};

  const handleCreateConversation = async (conversationText) => {
    if (!isLoggedIn) {
        alert("Log in to save conversations.");
        return;
    }

    try {
        const response = await axios.post(
            "https://ethician-django.onrender.com/api/save_conversation/",
            { conversation_text: conversationText },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );

        if (response.status === 201) {
            console.log("Conversation saved successfully!");
        }
    } catch (error) {
        console.error("Error saving conversation:", error);
    }
};

  const handleSubmit = async () => {
    if (!isLoggedIn && postCount >= 10) {
      alert('You have reached the maximum number of free requests. Please log in to continue.');
      return;
    }

    const token = localStorage.getItem('token');
    const response = await fetch('/api/analyze_text/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(isLoggedIn && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify({ text: 'Your prompt here', selected_experts: [currentExpert] }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Response:', data);
      setPostCount(postCount + 1); // Increment the post count for logged-out users
    } else {
      console.error('Request failed');
    }
  };
  

  const handleSendMessage = async (message) => {
    if (!isLoggedIn && postCount >= 10) {
      alert("You have reached the maximum number of free requests. Please log in to continue.");
      return;
    }

    const formData = new FormData();
    formData.append("text", message);
    formData.append("selected_experts", JSON.stringify(selectedExperts));
    formData.append("selected_option", currentLLM);

    // Attach files if there are any
    if (attachedFiles.length > 0) {
        attachedFiles.forEach((file) => {
            formData.append('file', file);
        });
    }

    try {
        console.log("Sending message to backend");
        const response = await axios.post(
            'https://ethician-django.onrender.com/api/analyze_text/',
            formData,
            {
                headers: {
                    'X-CSRFToken': getCsrfToken(),
                },
                withCredentials: true,
            }
        );

        console.log("Full response data:", response.data);

        // Safely extract the 'text' content from the response data
        const aiResponseText = response.data.text ? response.data.text : response.data.output || "No response received";

        // Update the messages array with the text response
        setMessages((prevMessages) => [
            ...prevMessages,
            { text: message, isUser: true },
            { text: aiResponseText, isUser: false },
        ]);

        // Trigger TTS if enabled
        if (isTTSEnabled) speakText(aiResponseText, volume / 100);

        // Save conversation if the user is logged in
        if (isLoggedIn) {
            const fullConversation = messages
                .map((msg) => msg.text || msg.images?.[0]?.url || "")
                .join('\n');

            await handleCreateConversation(fullConversation);
        }

        // Increment POST count for logged-out users
        if (!isLoggedIn) {
          setPostCount(postCount + 1);
        }
    } catch (error) {
        console.error('Error sending message to backend:', error);
    }
};

  // Ensure `speakText` uses the specified volume
  const speakText = (text, volumeLevel = 0.5) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.volume = volumeLevel;  // Volume adjusted here
      window.speechSynthesis.speak(utterance);
    } else {
      console.warn("TTS not supported in this browser");
    }
  };

  return (
    <div className="my-ui-container">
      <div className="ai-container">
        <button className="ai-image" onClick={toggleExpertPopup}>
          <img src={aiImage} alt="AI Expert" />
        </button>
      </div>

      {/* AI Expert Popup with Toggle Indicator */}
      {isExpertPopupOpen && (
        <div className="expert-popup">
          <h4>Available Experts</h4>
          <div className="expert-grid">
            {experts.map((expert, index) => (
              <button
                key={index}
                onClick={() => handleExpertSelection(expert)}
                className={`expert-button ${selectedExperts.includes(expert) ? 'selected' : ''}`}
              >
                {expert}
              </button>
            ))}
          </div>
          <button onClick={toggleExpertPopup} className="close-popup-button">Close</button>
        </div>
      )}

      <div className="console-container">
      <Console
        experts={experts}
        conversationHistory={conversationHistory}
        handleRestoreConversation={handleRestoreConversation}
        handleConversationSelect={handleConversationSelect}
        handleEditExpertClick={handleEditExpertClick}
        volume={volume}
        setVolume={setVolume}
        handleStartListening={handleStartListening}
        handleStopListening={handleStopListening}
        isListening={isListening} // Control the button label and behavior
        handleLLMSelection={handleLLMSelection}  // Pass handleLLMSelection to Console
        currentLLM={currentLLM}
        toggleTTS={toggleTTS}
        isTTSEnabled={isTTSEnabled}
      />
      </div>

      <div className="user-container">
        <button className="user-image">
          <img src={userImage} alt="User Icon" />
        </button>
      </div>

      <div className="conversation-container">
        <ConversationWindow messages={messages} />
      </div>

      <div className="entry-box-container">
        <InputSection
          attachedFiles={attachedFiles}
          setAttachedFiles={setAttachedFiles}
          prompt={prompt} // Pass the transcribed prompt
          setPrompt={setPrompt}
          onPromptSubmit={(prompt) => {
            const newMessage = { text: prompt, isUser: true };
            setMessages([...messages, newMessage]);
            handleSendMessage(prompt);
          }}
          onFileUpload={(file) => console.log('File uploaded:', file.name)}
          onCopyConversation={() => navigator.clipboard.writeText(messages.map(m => m.text).join('\n'))}
        />
      </div>

      {/* Expert Edit Popup */}
      {showEditPopup && (
        <div className="overlay">
          <div className="edit-popup">
            <h4>Edit Expert</h4>
            <input
              type="text"
              value={newExpertName}
              onChange={(e) => setNewExpertName(e.target.value)}
            />
            <button onClick={handleSaveExpertName}>Save</button>
            <button onClick={() => setShowEditPopup(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

// Console Component
function Console({ 
  experts, 
  handleEditExpertClick,
  conversationHistory,
  handleRestoreConversation, 
  handleConversationSelect,
  volume, 
  setVolume, 
  handleStartListening, 
  handleStopListening,
  isListening ,
  handleLLMSelection,
  currentLLM,
  toggleTTS,
  isTTSEnabled
}) {
  const [currentView, setCurrentView] = useState("default");
  const options = ["Text-To-Speech", "Speech Recognition", "LLM Selection", "Update Experts", "Conversation Select"];
  const [currentOptionIndex, setCurrentOptionIndex] = useState(0);

  const handleSelectOption = () => {
    setCurrentView(options[currentOptionIndex]);
  };

  const handleBack = () => {
    setCurrentView("default");
  };

  const handleScroll = (direction) => {
    if (direction === 'up') {
      setCurrentOptionIndex((prev) => (prev === 0 ? options.length - 1 : prev - 1));
    } else {
      setCurrentOptionIndex((prev) => (prev === options.length - 1 ? 0 : prev + 1));
    }
  };

  return (
    <div className="console-container">
  {currentView === "default" ? (
    <div className="settings-grid">
      <div className="settings-display">
        <div className="console-option">
          {options[currentOptionIndex]}
        </div>
      </div>
      <div className="settings-buttons">
        <button onClick={() => handleScroll('up')} className="up-arrow">▲</button>
        <button onClick={handleSelectOption} className="select-button">Select</button>
        <button onClick={() => handleScroll('down')} className="down-arrow">▼</button>
      </div>
      {/* Volume Slider */}
      <div className="volume-slider-container">
        <span className="volume-label">Volume Level:</span>
        <input
          type="range"
          className="volume-slider"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
        />
        <span className="volume-level">{volume}</span>
      </div>
    </div>
      ) : (
        <div className="settings-content">
          <h3>{currentView}</h3>
          <div className="settings-page-content">
            {currentView === "Text-To-Speech" && (
              <>
                <p>Enable or disable Text-to-Speech:</p>
                <button onClick={toggleTTS} className={`tts-button ${isTTSEnabled ? 'tts-enabled' : 'tts-disabled'}`}>
                  {isTTSEnabled ? "Disable TTS" : "Enable TTS"}
                </button>
                {/* Volume Slider for Text-To-Speech */}
                <div className="volume-slider-container">
                  <span className="volume-label">TTS Volume:</span>
                  <input
                    type="range"
                    className="volume-slider"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                  />
                  <span className="volume-level"> {volume}</span>
                </div>
              </>
            )}
            {currentView === "Speech Recognition" && (
              <>
                <p>Control Speech Recognition:</p>
                <button onClick={isListening ? handleStopListening : handleStartListening}>
                  {isListening ? "Stop Recording" : "Start Recording"}
                </button>
              </>
            )}
            {currentView === "LLM Selection" && (
              <>
                <p>Select Language Model:</p>
                <select
                  className="llm-dropdown"
                  value={currentLLM || ""}
                  onChange={(e) => handleLLMSelection(e.target.value)}
                >
                  <option value="" disabled>Select an LLM</option>
                  <option value="ChatGPT">ChatGPT</option>
                  <option value="Google Gemini">Google Gemini</option>
                  <option value="Anthropic Claude">Anthropic Claude</option>
                </select>
              </>
            )}
            {currentView === "Update Experts" && (
              <div className="expert-grid">
                {experts.map((expert, index) => (
                  <button key={index} className="expert-button" onClick={() => handleEditExpertClick(index)}>
                    {expert}
                  </button>
                ))}
              </div>
            )}
            {currentView === "Conversation Select" && (
                <>
                    <p>Select a conversation to review:</p>
                    <div className="conversation-history">
                        {conversationHistory.length > 0 ? (
                            conversationHistory.map((conv, index) => (
                                <div
                                    key={index}
                                    className="conversation-item"
                                    onClick={() => handleConversationSelect(conv.id)} // Use `handleConversationSelect`
                                >
                                    {`${conv.user_id}'s Conversation ${new Date(conv.timestamp).toLocaleString()}`}
                                </div>
                            ))
                        ) : (
                            <p>No conversation history available.</p>
                        )}
                    </div>
                </>
            )}
          </div>
          <button onClick={handleBack} className="back-button">Back</button>
        </div>
      )}
    </div>
  );
}

// ConversationWindow Component
function ConversationWindow({ messages }) {
  const conversationRef = useRef(null);

  useEffect(() => {
    if (conversationRef.current) {
      console.log("Updated messages:", messages);
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="conversation-window" ref={conversationRef}>
        {messages.map((message, index) => (
            <div
                key={index}
                className={`message-bubble ${message.isUser ? 'user-message' : 'ai-message'}`}
            >
                {/* Display text if present */}
                {message.text && <p>{message.text}</p>}
                
                {/* Display images if present, or skip if none */}
                {message.images && message.images.length > 0 && message.images.map((img, imgIndex) => (
                    <img
                        key={imgIndex}
                        src={img.url}
                        alt="AI response"
                        className="ai-image-response"
                        style={{ maxWidth: '100%', marginTop: '10px', borderRadius: '8px' }}
                    />
                ))}
            </div>
        ))}
    </div>
);
}

// InputSection Component
function InputSection({ prompt, setPrompt, onPromptSubmit, onFileUpload, onCopyConversation, attachedFiles, setAttachedFiles }) {

  const handleInputChange = (e) => {
    setPrompt(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
  
    if (attachedFiles.length + files.length > 5) {
      alert("You can only attach up to 5 files at a time.");
      return;
    }
  
    const newFiles = files.map((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          file.preview = e.target.result; // Add preview data to the file object
          setAttachedFiles((prev) => [...prev]); // Trigger a re-render
        };
        reader.readAsDataURL(file);
      }
      return file;
    });

    setAttachedFiles((prev) => [...prev, ...newFiles]);
    files.forEach((file) => onFileUpload(file));
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = attachedFiles.filter((_, i) => i !== index);
    setAttachedFiles(updatedFiles);
  };

  const handleBlur = (e) => {
    if (prompt === "") {
      e.target.style.height = "20px";
    }
  };

  return (
    <div className="input-section">
      {/* Display file popups above the entry bar */}
      <div className="attached-files-container">
        {attachedFiles.map((file, index) => (
          <div key={index} className="attached-file-popup">
            {file.preview ? (
              <img src={file.preview} alt={file.name} className="attached-file-image" />
            ) : (
              <span>{file.name}</span>
            )}
            <button onClick={() => handleRemoveFile(index)} className="remove-file-button">✕</button>
          </div>
        ))}
      </div>
      
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onBlur={handleBlur}
        className="prompt-input"
        placeholder="Type your message here..."
        rows={1}
        style={{ height: "20px" }}
      />
      <button onClick={onCopyConversation} className="icon-button">
        <FontAwesomeIcon icon={faClipboard} />
      </button>
      <button onClick={() => document.getElementById('file-upload').click()} className="icon-button">
        <FontAwesomeIcon icon={faPaperclip} />
      </button>
      <input type="file" id="file-upload" style={{ display: 'none' }} onChange={handleFileUpload} />
      <button onClick={() => onPromptSubmit(prompt)} className="icon-button">
      <FontAwesomeIcon icon={faArrowUp} />
      </button>
    </div>
  );
}

export default MultiChatXpertPage;
