import { type AndroidSymbol, type SFSymbol } from 'expo-symbols';

export interface OnboardingState {
    landingPage: boolean;
    showProgressBar: boolean;
    progressValue: number;
    showBackbutton: boolean;
    title: string;
    body?: string[];
    img?: boolean;
    borderButton?: boolean;
    twoButtons?: boolean;
    borderButtonColor?: string;
    backGroundButtonOne?: string;
    backGroundButtonTwo?: string;
    iconButtonOne?: AndroidSymbol | SFSymbol;
    iconButtonTwo?: AndroidSymbol | SFSymbol;
    iconButtonOneDimentions?: number;
    iconButtonTwoDimentions?: number;
    textButtonOne: string;
    textButtonOneColor?: string;
    textButtonTwoColor?: string;
    textButtonTwo?: string;
    registre: boolean;
    roles: string[];
}
