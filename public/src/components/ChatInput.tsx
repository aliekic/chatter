import React, { useState, useRef } from "react";
import styled from "styled-components";
import EmojiPicker from "emoji-picker-react";
import { ChatInputProps } from "../types";

const ChatInput: React.FC<ChatInputProps> = ({ handleSendMsg }) => {
  const [msg, setMsg] = useState<string>("");
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  const handleEmojiClick = (emojiObject: any) => {
    setMsg((prevMsg) => prevMsg + emojiObject.emoji);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
            😊
          </button>
          {showEmojiPicker && (
            <div className="emoji-picker-react" ref={emojiPickerRef}>
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>
      </div>
      <form className="input-container" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit">Send</button>
      </form>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: rgba(44, 62, 80, 0.5);
  padding: 0 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    
    .emoji {
      position: relative;
      
      button {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        transition: all 0.3s ease;
        
        &:hover {
          transform: scale(1.2);
        }
      }
      
      .emoji-picker-react {
        position: absolute;
        top: -350px;
        background-color: rgba(44, 62, 80, 0.95);
        box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
        border: 1px solid rgba(52, 152, 219, 0.3);
        border-radius: 0.8rem;
        
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: rgba(44, 62, 80, 0.5);
          width: 5px;
          
          &-thumb {
            background-color: rgba(52, 152, 219, 0.5);
            border-radius: 1rem;
          }
        }
        
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        
        .emoji-search {
          background-color: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(52, 152, 219, 0.3);
          border-radius: 0.5rem;
          color: white;
          
          &:focus {
            outline: none;
            border-color: rgba(52, 152, 219, 0.8);
            box-shadow: 0 0 10px rgba(52, 152, 219, 0.3);
          }
        }
        
        .emoji-group:before {
          background-color: rgba(44, 62, 80, 0.95);
        }
      }
    }
  }
  
  .input-container {
    width: 100%;
    border-radius: 1.5rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: rgba(255, 255, 255, 0.05);
    padding: 0.5rem 1rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
    
    &:hover, &:focus-within {
      background-color: rgba(255, 255, 255, 0.1);
      border-color: rgba(52, 152, 219, 0.3);
      box-shadow: 0 0 10px rgba(52, 152, 219, 0.2);
    }
    
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      border: none;
      color: white;
      padding-left: 1rem;
      font-size: 1.2rem;
      
      &::selection {
        background-color: rgba(52, 152, 219, 0.5);
      }
      
      &:focus {
        outline: none;
      }
      
      &::placeholder {
        color: rgba(255, 255, 255, 0.5);
      }
    }
    
    button {
      padding: 0.5rem 1.5rem;
      border-radius: 1.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(90deg, #3498db 0%, #2980b9 100%);
      border: none;
      color: white;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 2px 10px rgba(52, 152, 219, 0.2);
      
      &:hover {
        background: linear-gradient(90deg, #2980b9 0%, #3498db 100%);
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
      }
      
      &:active {
        transform: translateY(0);
      }
      
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        
        svg {
          font-size: 1rem;
        }
      }
      
      svg {
        font-size: 1.5rem;
      }
    }
  }
`;

export default ChatInput; 