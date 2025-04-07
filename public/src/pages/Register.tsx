import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";
import { User } from './../types'

type RegRespUser = Pick<User, 'username' | 'email'>;
type RegisterFormValues = RegRespUser & { password: string, confirmPassword: string };
type RegisterResponse = {
    status: boolean;
    msg: string;
    user: RegRespUser;
};

export default function Register() {
    const navigate = useNavigate();

    const toastOptions = {
        position: "bottom-right" as const,
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark" as const,
    };

    const [values, setValues] = useState<RegisterFormValues>({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    useEffect(() => {
        if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY || "")) {
            navigate("/");
        }
    }, [navigate]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleValidation = (): boolean => {
        const { password, confirmPassword, username, email } = values;
        if (password !== confirmPassword) {
            toast.error("Password and confirm password should be same.", toastOptions);
            return false;
        } else if (username.length < 3) {
            toast.error("Username should be greater than 3 characters.", toastOptions);
            return false;
        } else if (password.length < 8) {
            toast.error("Password should be equal or greater than 8 characters.", toastOptions);
            return false;
        } else if (email.trim() === "") {
            toast.error("Email is required.", toastOptions);
            return false;
        }
        return true;
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (handleValidation()) {
            const { email, username, password } = values;
            try {
                const { data } = await axios.post<RegisterResponse>(registerRoute, {
                    username,
                    email,
                    password,
                });

                if (!data.status) {
                    toast.error(data.msg || "Registration failed.", toastOptions);
                } else if (data.user) {
                    localStorage.setItem(
                        process.env.REACT_APP_LOCALHOST_KEY || "",
                        JSON.stringify(data.user)
                    );
                    navigate("/");
                }
            } catch (error) {
                console.error("Registration error:", error);
                toast.error("Something went wrong. Please try again.", toastOptions);
            }
        }
    };

    return (
        <>
            <FormContainer>
                <form action="" onSubmit={(event) => handleSubmit(event)}>
                    <div className="brand">
                        <img src={Logo} alt="logo" />
                        <h1>snappy</h1>
                    </div>
                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        onChange={(e) => handleChange(e)}
                    />
                    <button type="submit">Create User</button>
                    <span>
                        Already have an account ? <Link to="/login">Login.</Link>
                    </span>
                </form>
            </FormContainer>
            <ToastContainer />
        </>
    );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
  
  .brand {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    justify-content: center;
    margin-bottom: 2rem;
    
    img {
      height: 5rem;
      filter: drop-shadow(0 0 8px rgba(52, 152, 219, 0.6));
      transition: all 0.3s ease;
      
      &:hover {
        transform: scale(1.05);
        filter: drop-shadow(0 0 12px rgba(52, 152, 219, 0.8));
      }
    }
    
    h1 {
      color: white;
      text-transform: uppercase;
      font-size: 2.5rem;
      font-weight: 700;
      letter-spacing: 2px;
      text-shadow: 0 0 10px rgba(52, 152, 219, 0.5);
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: rgba(44, 62, 80, 0.7);
    border-radius: 1.5rem;
    padding: 3rem 4rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    width: 90%;
    max-width: 450px;
    transition: all 0.3s ease;
    
    &:hover {
      box-shadow: 0 12px 40px rgba(52, 152, 219, 0.2);
    }
  }
  
  input {
    background-color: rgba(255, 255, 255, 0.1);
    padding: 1.2rem;
    border: 1px solid rgba(52, 152, 219, 0.3);
    border-radius: 0.8rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    transition: all 0.3s ease;
    
    &:focus {
      border: 1px solid #3498db;
      outline: none;
      box-shadow: 0 0 10px rgba(52, 152, 219, 0.3);
    }
    
    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
  }
  
  button {
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
  
  span {
    color: rgba(255, 255, 255, 0.8);
    text-align: center;
    font-size: 0.9rem;
    
    a {
      color: #3498db;
      text-decoration: none;
      font-weight: bold;
      transition: all 0.3s ease;
      
      &:hover {
        color: #2980b9;
        text-decoration: underline;
      }
    }
  }
`;
