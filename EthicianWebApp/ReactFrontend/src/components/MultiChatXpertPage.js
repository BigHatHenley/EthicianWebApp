import React, { useState, useEffect, useRef } from 'react';
import './MultiChatXpertPage.css';
import axios from 'axios';
import Bowser from "bowser";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faClipboard, faPaperclip, faBars } from '@fortawesome/free-solid-svg-icons';

function MultiChatXpertPage() {
  const [messages, setMessages] = useState([]);
  const [isTTSEnabled, setTTSEnabled] = useState(false);
  const [experts, setExperts] = useState([
    "Ethician", "Mechanical Engineer", "Metallurgist", "Safety Engineer", "Materials Engineer",
    "Robotics Engineer", "Electrical Engineer", "Civil Engineer", "Software Engineer", "Chemical Engineer",
    "Aerospace Engineer", "Petroleum Engineer", "Biomedical Engineer", "Environment Engineer", "Quality Engineer"
  ]);
  const [availableExperts, setAvailableExperts] = useState([
    "Expert 1", "Expert 2", "Expert 3", "Expert 4", "Expert 5", "Expert 6", "Expert 7"
  ]);
  const [currentExpert, setCurrentExpert] = useState('Expert 1');
  const [selectedExperts, setSelectedExperts] = useState([]);
  const [currentLLM, setCurrentLLM] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [currentExpertEdit, setCurrentExpertEdit] = useState(null);
  const [newExpertName, setNewExpertName] = useState("");
  const [prompt, setPrompt] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [volume, setVolume] = useState(50);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);  // Collapsible sidebar
  const [conversationHistory, setConversationHistory] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [newConversationText, setNewConversationText] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [postCount, setPostCount] = useState(0);
  const [attachedFiles, setAttachedFiles] = useState([]);

  // Speech Recognition Setup
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;
  const browser = Bowser.getParser(window.navigator.userAgent);
  const isFirefox = browser.getBrowserName() === "Firefox";

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const csrfToken = getCsrfToken();
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
      setPrompt(transcript);
      console.log("Transcribed Text:", transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      console.log("Speech recognition ended.");
      setIsListening(false);
    };
  }

  // Sidebar Toggle
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleStartListening = () => {
    if (isFirefox) {
      alert("Speech recognition is not supported on Firefox. Please use a different browser.");
      return;
    }
    if (recognition && !isListening) {
      setPrompt("");
      setIsListening(true);
      console.log("Starting Speech Recognition");
      recognition.start();
    }
  };

  const handleStopListening = () => {
    if (recognition && isListening) {
      console.log("Stopping Speech Recognition");
      recognition.stop();
      setIsListening(false);
    }
  };

  const toggleTTS = () => {
    setTTSEnabled(!isTTSEnabled);
    console.log("TTS Enabled:", !isTTSEnabled);
  };

  // Expert selection logic
  const handleExpertSelection = (expert) => {
    setSelectedExperts((prevExperts) => {
      const updated = prevExperts.includes(expert)
        ? prevExperts.filter((e) => e !== expert)
        : [...prevExperts, expert];
      console.log("Updated selectedExperts:", updated);
      return updated;
    });
  };

  const handleLLMSelection = (llm) => {
    setCurrentLLM(llm);
    console.log("Updated currentLLM:", llm);
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

  // Retrieve CSRF token from cookies
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
      setAvailableExperts(availableExperts.slice(0, 5));
    } else {
      setAvailableExperts([...experts]); // or the full set of 15
    }
  }, [experts, availableExperts]);

  const handleRestoreConversation = (conversationText) => {
    const restoredMessages = conversationText.split('\n').map((text, idx) => ({
      text,
      isUser: idx % 2 === 0,
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
      setPostCount(postCount + 1);
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
      const aiResponseText = response.data.text
        ? response.data.text
        : response.data.output || "No response received";

      setMessages((prev) => [
        ...prev,
        { text: message, isUser: true },
        { text: aiResponseText, isUser: false },
      ]);

      if (isTTSEnabled) speakText(aiResponseText, volume / 100);

      if (isLoggedIn) {
        const fullConversation = messages
          .map((msg) => msg.text || msg.images?.[0]?.url || "")
          .join('\n');
        await handleCreateConversation(fullConversation);
      }

      if (!isLoggedIn) {
        setPostCount(postCount + 1);
      }
    } catch (error) {
      console.error('Error sending message to backend:', error);
    }
  };

  const speakText = (text, volumeLevel = 0.5) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.volume = volumeLevel;
      window.speechSynthesis.speak(utterance);
    } else {
      console.warn("TTS not supported in this browser");
    }
  };

  return (
    <div className={`my-ui-container ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      
      {/* Collapsible Sidebar */}
      <div className={`sidebar-container ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <button onClick={toggleSidebar} className="sidebar-toggle">
            <FontAwesomeIcon icon={faBars} />
          </button>
          {isSidebarOpen && <h3>Settings</h3>}
        </div>

        {isSidebarOpen && (
          <>
            {/* 
              This main sidebar content is now non-scrollable and 
              displays each setting in a vertical stack
            */}
            <div className="sidebar-content">
              <SettingsPanel
                experts={experts}
                handleEditExpertClick={handleEditExpertClick}
                volume={volume}
                setVolume={setVolume}
                handleStartListening={handleStartListening}
                handleStopListening={handleStopListening}
                isListening={isListening}
                handleLLMSelection={handleLLMSelection}
                currentLLM={currentLLM}
                toggleTTS={toggleTTS}
                isTTSEnabled={isTTSEnabled}
              />
            </div>

            {/* Conversation history pinned to bottom */}
            <div className="sidebar-footer">
              <h4>Conversation History</h4>
              {isLoggedIn ? (
                <div className="conversation-history">
                  {conversationHistory.length > 0 ? (
                    conversationHistory.map((conv, idx) => (
                      <div 
                        key={idx}
                        className="conversation-item"
                        onClick={() => handleConversationSelect(conv.id)}
                      >
                        {`${conv.user_id}'s Conversation ${new Date(conv.timestamp).toLocaleString()}`}
                      </div>
                    ))
                  ) : (
                    <p>No conversation history available.</p>
                  )}
                </div>
              ) : (
                <p>(Placeholder) Log in to view your conversation history.</p>
              )}
            </div>
          </>
        )}
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Conversation Window */}
        <div className="conversation-container">
          <ConversationWindow messages={messages} />
        </div>

        {/* Expert Selection Matrix */}
        <div className="expert-matrix-container">
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
        </div>

        {/* Entry Box */}
        <div className="entry-box-container">
          <InputSection
            attachedFiles={attachedFiles}
            setAttachedFiles={setAttachedFiles}
            prompt={prompt}
            setPrompt={setPrompt}
            onPromptSubmit={(prompt) => {
              const newMessage = { text: prompt, isUser: true };
              setMessages([...messages, newMessage]);
              handleSendMessage(prompt);
            }}
            onFileUpload={(file) => console.log('File uploaded:', file.name)}
            onCopyConversation={() =>
              navigator.clipboard.writeText(messages.map(m => m.text).join('\n'))
            }
          />
        </div>
      </div>

      {/* Edit Expert Popup */}
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

/**
 *  SettingsPanel 
 *    - Displays TTS toggle, volume slider, speech recognition control,
 *      LLM selection, and expert update in a vertical list.
 */
function SettingsPanel({ 
  experts,
  handleEditExpertClick,
  volume,
  setVolume,
  handleStartListening,
  handleStopListening,
  isListening,
  handleLLMSelection,
  currentLLM,
  toggleTTS,
  isTTSEnabled
}) {
  return (
    <div className="settings-panel">
      {/* TTS Section */}
      <div className="setting-item">
        <h4>Text-To-Speech</h4>
        <button
          onClick={toggleTTS}
          className={`tts-button ${isTTSEnabled ? 'tts-enabled' : 'tts-disabled'}`}
        >
          {isTTSEnabled ? "Disable TTS" : "Enable TTS"}
        </button>

        <div className="volume-slider-container">
          <span className="volume-label">Volume:</span>
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

      {/* Speech Recognition Section */}
      <div className="setting-item">
        <h4>Speech Recognition</h4>
        <button onClick={isListening ? handleStopListening : handleStartListening}>
          {isListening ? "Stop Recording" : "Start Recording"}
        </button>
      </div>

      {/* LLM Selection Section */}
      <div className="setting-item">
        <h4>LLM Selection</h4>
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
      </div>

      {/* Update Experts Section */}
      <div className="setting-item">
        <h4>Update Experts</h4>
        <div className="expert-update-grid">
          {experts.map((expert, index) => (
            <button 
              key={index}
              className="expert-button"
              onClick={() => handleEditExpertClick(index)}
            >
              {expert}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 *  ConversationWindow 
 */
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
          {message.text && <p>{message.text}</p>}
          {message.images && message.images.length > 0 && message.images.map((img, i) => (
            <img
              key={i}
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

/**
 *  InputSection
 */
function InputSection({ 
  prompt, 
  setPrompt, 
  onPromptSubmit, 
  onFileUpload, 
  onCopyConversation, 
  attachedFiles, 
  setAttachedFiles 
}) {
  const handleBlur = (e) => {
    if (prompt === "") {
      e.target.style.height = "20px";
    }
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
        reader.onload = (ev) => {
          file.preview = ev.target.result; 
          setAttachedFiles((prev) => [...prev]);
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

  return (
    <div className="input-section">
      <div className="attached-files-container">
        {attachedFiles.map((file, index) => (
          <div key={index} className="attached-file-popup">
            {file.preview ? (
              <img 
                src={file.preview} 
                alt={file.name} 
                className="attached-file-image" 
              />
            ) : (
              <span>{file.name}</span>
            )}
            <button 
              onClick={() => handleRemoveFile(index)} 
              className="remove-file-button"
            >
              ✕
            </button>
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
      <button 
        onClick={() => document.getElementById('file-upload').click()} 
        className="icon-button"
      >
        <FontAwesomeIcon icon={faPaperclip} />
      </button>
      <input 
        type="file" 
        id="file-upload" 
        style={{ display: 'none' }} 
        onChange={handleFileUpload} 
      />
      <button onClick={() => onPromptSubmit(prompt)} className="icon-button">
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
    </div>
  );
}

export default MultiChatXpertPage;
