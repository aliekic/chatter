import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, host } from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import { User, Contact } from './../types'


export default function Chat() {
    const navigate = useNavigate();
    const socket = useRef<Socket | null>(null);
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [currentChat, setCurrentChat] = useState<Contact>();
    const [currentUser, setCurrentUser] = useState<User>();

    useEffect(() => {
        const checkUser = async () => {
            const storedData = localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY || "");
            if (!storedData) {
                navigate("/login");
            } else {
                try {
                    const user: User = JSON.parse(storedData);
                    setCurrentUser(user);
                } catch (err) {
                    console.error("Failed to parse user data:", err);
                    navigate("/login");
                }
            }
        };
        checkUser();
    }, [navigate]);

    useEffect(() => {
        if (currentUser) {
            socket.current = io(host);
            socket.current.emit("add-user", currentUser._id);
        }
    }, [currentUser]);

    useEffect(() => {
        const fetchContacts = async () => {
            if (currentUser) {
                if (currentUser.isAvatarImageSet) {
                    try {
                        const { data } = await axios.get<Contact[]>(`${allUsersRoute}/${currentUser._id}`);
                        setContacts(data);
                    } catch (err) {
                        console.error("Failed to fetch contacts:", err);
                    }
                } else {
                    navigate("/setAvatar");
                }
            }
        };
        fetchContacts();
    }, [currentUser, navigate]);

    const handleChatChange = (contact: Contact) => {
        setCurrentChat(contact);
    };

    return (
        <>
            <Container>
                <div className="container">
                    <Contacts contacts={contacts} changeChat={handleChatChange} />
                    {currentChat === undefined ? (
                        <Welcome />
                    ) : (
                        <ChatContainer currentChat={currentChat} socket={socket} />
                    )}
                </div>
            </Container>
        </>
    );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
  
  .container {
    height: 85vh;
    width: 85vw;
    background-color: rgba(44, 62, 80, 0.7);
    display: grid;
    grid-template-columns: 25% 75%;
    border-radius: 1.5rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    overflow: hidden;
    transition: all 0.3s ease;
    
    &:hover {
      box-shadow: 0 12px 40px rgba(52, 152, 219, 0.2);
    }
    
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
