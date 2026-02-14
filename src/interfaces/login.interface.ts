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
    name: string;
    email: string;
    role: string;
}