import { useEffect, useState } from "react";
import styled from "styled-components";

const Welcome = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUsername = async () => {
      const storedData = localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY || "");
      if (!storedData) return;

      try {
        const parsed = JSON.parse(storedData);
        setUserName(parsed.username);
      } catch (err) {
        console.error("Failed to parse stored user:", err);
      }
    };

    fetchUsername();
  }, []);

  return (
    <Container>
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  padding: 2rem;
  text-align: center;
  
  img {
    height: 20rem;
    filter: drop-shadow(0 0 10px rgba(52, 152, 219, 0.5));
    transition: all 0.3s ease;
    
    &:hover {
      transform: scale(1.05);
      filter: drop-shadow(0 0 15px rgba(52, 152, 219, 0.7));
    }
  }
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    font-weight: 700;
    text-shadow: 0 0 10px rgba(52, 152, 219, 0.3);
    
    span {
      color: #3498db;
      font-weight: 800;
      text-shadow: 0 0 10px rgba(52, 152, 219, 0.5);
    }
  }
  
  h3 {
    font-size: 1.5rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.8);
    margin-top: 1rem;
  }
`;

export default Welcome; 