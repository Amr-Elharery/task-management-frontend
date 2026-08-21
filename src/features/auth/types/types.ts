export interface User {
  _id: string;
  name: string;
  email: string;
}
export interface LoginResponse {
  message: string;
  user: User;
  token: string;
}

export interface RegisterResponse {
  user: User;
}
