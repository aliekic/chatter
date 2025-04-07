import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import { ContactsProps, Contact } from "../types";

const Contacts: React.FC<ContactsProps> = ({ contacts, changeChat }) => {
  const [currentUserName, setCurrentUserName] = useState<string | undefined>(undefined);
  const [currentUserImage, setCurrentUserImage] = useState<string | undefined>(undefined);
  const [currentSelected, setCurrentSelected] = useState<number | undefined>(undefined);

  useEffect(() => {
    const getCurrentUser = async () => {
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY || "") || "{}"
      );
      setCurrentUserName(data.username);
      setCurrentUserImage(data.avatarImage);
    };
    getCurrentUser();
  }, []);

  const changeCurrentChat = (index: number, contact: Contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserImage && currentUserName && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>chatter</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${index === currentSelected ? "selected" : ""
                    }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt=""
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: rgba(44, 62, 80, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    padding: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    
    img {
      height: 2rem;
      filter: drop-shadow(0 0 5px rgba(52, 152, 219, 0.6));
      transition: all 0.3s ease;
      
      &:hover {
        transform: scale(1.05);
        filter: drop-shadow(0 0 8px rgba(52, 152, 219, 0.8));
      }
    }
    
    h3 {
      color: white;
      text-transform: uppercase;
      font-weight: 600;
      letter-spacing: 1px;
      text-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
    }
  }
  
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    padding: 1rem 0;
    
    &::-webkit-scrollbar {
      width: 0.2rem;
      
      &-thumb {
        background-color: rgba(52, 152, 219, 0.3);
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    
    .contact {
      background-color: rgba(255, 255, 255, 0.05);
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.8rem;
      padding: 0.8rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: all 0.3s ease;
      border: 1px solid rgba(255, 255, 255, 0.05);
      
      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      }
      
      .avatar {
        img {
          height: 3rem;
          border-radius: 50%;
          border: 2px solid rgba(52, 152, 219, 0.3);
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
          font-weight: 500;
        }
      }
    }
    
    .selected {
      background: linear-gradient(90deg, rgba(52, 152, 219, 0.3) 0%, rgba(41, 128, 185, 0.3) 100%);
      border: 1px solid rgba(52, 152, 219, 0.5);
      box-shadow: 0 4px 15px rgba(52, 152, 219, 0.2);
    }
  }

  .current-user {
    background-color: rgb(67, 88, 104, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    padding: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
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
      h2 {
        color: white;
        font-weight: 600;
      }
    }
    
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;

export default Contacts; 