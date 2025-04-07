import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { toast, ToastOptions } from "react-toastify";
import axios from "axios";
import multiavatar from "@multiavatar/multiavatar/esm";
import { setAvatarRoute } from "../utils/APIRoutes";


const api: string = process.env.REACT_APP_LOCALHOST_KEY || "";
const SetAvatar: React.FC = () => {
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedAvatar, setSelectedAvatar] = useState<number | undefined>(undefined);

  const toastOptions: ToastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    const user = localStorage.getItem(api);
    if (!user) navigate("/login");
  }, [navigate]);

  const generateRandomName = () => Math.random().toString(36).substring(2, 10);

  useEffect(() => {
    const generateAvatars = () => {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const randomName = generateRandomName();
        const svgCode = multiavatar(randomName);
        const encoded = btoa(unescape(encodeURIComponent(svgCode)));
        data.push(encoded);
      }
      setAvatars(data);
      setIsLoading(false);
    };

    generateAvatars();
  }, []);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
      return;
    }

    const storedData = localStorage.getItem(api)
    if (!storedData) return;

    const user = await JSON.parse(
      storedData
    );
    if (!user) return;

    const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
      image: avatars[selectedAvatar],
    });

    if (data.isSet) {
      user.isAvatarImageSet = true;
      user.avatarImage = avatars[selectedAvatar];
      localStorage.setItem(
        api,
        JSON.stringify(user)
      );
      navigate("/");
    } else {
      toast.error("Error setting avatar. Please try again.", toastOptions);
    }
  };

  return (
    <>
      {isLoading ? (
        <Container>
          <Loader>Loading...</Loader>
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${selectedAvatar === index ? "selected" : ""
                    }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button className="submit-btn" onClick={setProfilePicture}>
            Set as Profile Picture
          </button>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
  height: 100vh;
  width: 100vw;
  
  .title-container {
    h1 {
      color: white;
      font-size: 2.5rem;
      font-weight: 700;
      text-align: center;
      text-shadow: 0 0 10px rgba(52, 152, 219, 0.5);
      max-width: 800px;
      line-height: 1.3;
    }
  }
  
  .avatars {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    justify-content: center;
    
    .avatar {
      border: 0.4rem solid rgba(52, 152, 219, 0.5);
      border-radius: 1rem;
      padding: 0.8rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.3s ease;
      background-color: rgba(255, 255, 255, 0.05);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(52, 152, 219, 0.2);
      }
      
      img {
        height: 6rem;
        transition: all 0.3s ease;
        
        &:hover {
          transform: scale(1.05);
        }
      }
    }
    
    .selected {
      border: 0.4rem solid #3498db;
      background-color: rgba(52, 152, 219, 0.1);
      box-shadow: 0 8px 25px rgba(52, 152, 219, 0.3);
    }
  }
  
  .submit-btn {
    background: linear-gradient(90deg, #3498db 0%, #2980b9 100%);
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.8rem;
    font-size: 1.1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
    
    &:hover {
      background: linear-gradient(90deg, #2980b9 0%, #3498db 100%);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(52, 152, 219, 0.4);
    }
    
    &:active {
      transform: translateY(0);
    }
  }
`;

const Loader = styled.div`
  color: white;
  font-size: 2rem;
  font-weight: 600;
  text-shadow: 0 0 10px rgba(52, 152, 219, 0.5);
`;

export default SetAvatar; 