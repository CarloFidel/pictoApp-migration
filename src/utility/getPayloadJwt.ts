export interface PayloadJwt {
    email: string;
    id: string;
    name: string;
    lastName: string;
    roles: string[];
    date: number;
    exp: number;
}


export const getPayloadJwt = (token: string) => {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    return decoded;
}