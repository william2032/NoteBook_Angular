export interface User {
    id: string;
    email: string;
    name: string;
}
export  interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}

export  interface AuthResponse {
    access_token: string;
    user: User;
}

