import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Logout: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Button onClick={handleClick}>
      <h1>Logout</h1>
    </Button>
  );
};

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1.5rem;
  border-radius: 0.8rem;
  background: linear-gradient(90deg, #3498db 0%, #2980b9 100%);
  border: none;
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
  
  h1 {
    color: white;
    text-transform: uppercase;
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: 1px;
  }
`;

export default Logout; 