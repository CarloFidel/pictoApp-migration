export interface UserState {
    name?: string;
    lastName?: string;
    email: string;
    password: string;
    role?: string[];
    token?: string;

    isLoggedIn: boolean;

    logIn: () => void;
    logOut: () => void;
}