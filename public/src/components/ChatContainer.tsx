import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";
import { ChatProps, Message } from "../types";
import ChatInput from "./ChatInput";
import Logout from "./Logout";


type User = {
  _id: string;
};

const ChatContainer: React.FC<ChatProps> = ({
  currentChat,
  socket
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [arrivalMessage, setArrivalMessage] = useState<Message | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const fetchMessages = async () => {
      const raw = localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY || "");
      if (!raw) return;

      const data: User = JSON.parse(raw);
      const response = await axios.post(recieveMessageRoute, {
        from: data._id,
        to: currentChat._id,
      });

      setMessages(response.data);
    };

    fetchMessages();
  }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        const storedData = localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY || "");
        if (!storedData) return;

        await JSON.parse(
          storedData
        )._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  const handleSendMsg = async (msg: string): Promise<void> => {
    const raw = localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY || "");
    if (!raw) return;

    const data: User = JSON.parse(raw);

    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      msg,
    });

    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg,
    });

    const msgs: Message[] = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg: string) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt=""
            />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${message.fromSelf ? "sended" : "recieved"
                  }`}
              >
                <div className="content ">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
};

const Container = styled.div`
  padding-top: 1rem;
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      
      .avatar {
        img {
          height: 3rem;
          border-radius: 50%;
          border: 2px solid rgba(52, 152, 219, 0.5);
          transition: all 0.3s ease;
          
          &:hover {
            border-color: rgba(52, 152, 219, 0.8);
            transform: scale(1.05);
          }
        }
      }
      
      .username {
        h3 {
          color: white;
          font-weight: 600;
          text-shadow: 0 0 5px rgba(52, 152, 219, 0.3);
        }
      }
    }
  }
  
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    
    &::-webkit-scrollbar {
      width: 0.2rem;
      
      &-thumb {
        background-color: rgba(52, 152, 219, 0.3);
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    
    .message {
      display: flex;
      align-items: center;
      
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
        }
        
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    
    .sended {
      justify-content: flex-end;
      
      .content {
        background: linear-gradient(90deg, rgba(52, 152, 219, 0.2) 0%, rgba(41, 128, 185, 0.2) 100%);
        border: 1px solid rgba(52, 152, 219, 0.3);
      }
    }
    
    .recieved {
      justify-content: flex-start;
      
      .content {
        background: linear-gradient(90deg, rgba(44, 62, 80, 0.3) 0%, rgba(52, 73, 94, 0.3) 100%);
        border: 1px solid rgba(255, 255, 255, 0.1);
      }
    }
  }
`;

export default ChatContainer; 