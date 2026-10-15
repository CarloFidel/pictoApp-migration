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
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlkIjoiYTA3MjRhMzktMWRjMC00YThmLWE3NDctZjAwNmRiMzRlMmM4IiwibmFtZSI6IkFkbWluIiwibGFzdE5hbWUiOiJBZG1pbiIsInJvbGVzIjpbInRoZXJhcGlzdCJdLCJpYXQiOjE3OTIwNjgyMjYsImV4cCI6MTc5MjA3NTQyNn0.Y-CfHQaOVXkSXRtkv1gWjkPvt8suShS70vKDxVTSOrA',

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