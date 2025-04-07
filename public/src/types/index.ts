export interface User {
    _id: string;
    username: string;
    email: string;
    avatarImage: string;
    isAvatarImageSet: boolean;
}

export interface Contact extends User {
    // TO-DO
}

export interface Message {
    fromSelf: boolean;
    message: string;
}

export interface ChatProps {
    currentChat: Contact;
    socket: React.RefObject<any>;
}

export interface ContactsProps {
    contacts: Contact[];
    changeChat: (contact: Contact) => void;
}

export interface ChatInputProps {
    handleSendMsg: (msg: string) => void;
}

export interface LogoutProps {
    currentUser: User | undefined;
} 