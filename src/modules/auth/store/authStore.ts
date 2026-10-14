import { deleteItemAsync, getItem, setItem } from 'expo-secure-store';
import { create } from "zustand";
import { createJSONStorage, persist } from 'zustand/middleware';
import { UserState } from "../interfaces/user-state.interface";


export const useAuthStore = create(
    persist<UserState>(
        (set) => ({
            isLoggedIn: false,

            name: '',
            lastName: '',
            email: '',
            password: '',
            role: [],
            token: '',

            logIn: () => set((state) => {
                return {
                    ...state,
                    isLoggedIn: true,
                }
            }),
            logOut: () => set((state) => {
                return {
                    ...state,
                    isLoggedIn: false,
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