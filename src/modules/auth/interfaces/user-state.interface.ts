export interface UserState {
    name?: string;
    lastName?: string;
    email: string;
    password: string;
    role?: string[];
    token?: string;

    isLoggedIn: boolean;

    logIn: (
        name: string,
        lastName: string,
        email: string,
        password: string,
        role: string[],
        token: string,
    ) => void;
    logOut: () => void;
}