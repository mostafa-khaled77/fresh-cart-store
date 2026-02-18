export interface FailedLogin {
    message: string;
    statusMsg:string;
}

export interface SuccessLogin {
    message: string;
    token: string; 
    user: UserInterface;    
}

export interface UserInterface {
    id?: string;
    name: string;
    email: string;
    role: string;
    phone?: string;
}