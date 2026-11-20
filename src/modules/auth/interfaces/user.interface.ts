export interface UserRegister {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UserLogin {
  name?: string;
  lastName?: string;

  email: string;
  password: string;
}