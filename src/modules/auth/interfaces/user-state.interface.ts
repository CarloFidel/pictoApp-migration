export interface UserState {
    name?: string;
    lastName?: string;
    email: string;
    password: string;
    role?: string[];
    token?: string;
    avatar?: string;
    isSessionExpired?: boolean;

    isLoggedIn: boolean;

    logIn: (
        name: string,
        lastName: string,
        email: string,
        password: string,
        role: string[],
        token: string,
        avatar?: string,
    ) => void;
    logOut: () => void;
    
    sessionExpired: () => void;
}