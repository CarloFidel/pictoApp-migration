import { deleteItemAsync, getItem, setItem } from 'expo-secure-store';
import { create } from "zustand";
import { createJSONStorage, persist } from 'zustand/middleware';
import { UserState } from "../interfaces/user-state.interface";


export const useAuthStore = create(
    persist<UserState>(
        (set) => ({
            isLoggedIn: false,
            isSessionExpired: false,

            name: '',
            lastName: '',
            email: '',
            password: '',
            role: [],
            token: '',

            logIn: (name, lastName, email, password, role, token) => set((state) => {
                return {
                    isLoggedIn: true,
                    isSessionExpired: false,

                    name,
                    lastName,
                    email,
                    password,
                    role,
                    token,
                }
            }),
            logOut: () => set((state) => {
                return {
                    isLoggedIn: false,
                    isSessionExpired: false,

                    name: '',
                    lastName: '',
                    email: '',
                    password: '',
                    role: [],
                    token: '',
                }
            }),

            sessionExpired: () => set((state) => {
                return {
                    isLoggedIn: false,
                    isSessionExpired: true,

                    name: '',
                    lastName: '',
                    email: '',
                    password: '',
                    role: [],
                    token: '',
                }
            }),

        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => ({
                getItem: getItem,
                setItem: setItem,
                removeItem: deleteItemAsync,

            })),
        }
    )
)