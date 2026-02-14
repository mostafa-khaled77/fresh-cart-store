export interface RegisterResponse {
  message: string;
  statusMsg?: string;
  user?: {
    name: string;
    email: string;
    role: string;
  };
  token?: string;
}