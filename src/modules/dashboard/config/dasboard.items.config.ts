import { type Href } from 'expo-router'
import type { AndroidSymbol, SFSymbol } from 'expo-symbols'


type Items = {
    title: string
    icon: { ios: SFSymbol; android: AndroidSymbol }
    redirect?: Href
    onPress?: () => void
}

export const DASHBOARD_CUENTA_ITEMS: Items[] = [
    {
        title: 'Información personal',
        icon: { ios: 'person', android: 'person' },
        redirect: '/myProfile',
    },
    {
        title: 'Mis fotos',
        icon: { ios: 'photo', android: 'photo' },
        redirect: '/myPhotos',
    },
    {
        title: 'Horarios guardados',
        icon: { ios: 'calendar', android: 'event' },
        redirect: '/mySchedules',
    },
    {
        title: 'Mis artículos',
        icon: { ios: 'book', android: 'book' },
        redirect: '/myArticles',
    },


]

export const DASHBOARD_AYUDA_ITEMS: Items[] = [
    {
        title: 'Preguntas frecuentes',
        icon: { ios: 'questionmark.circle', android: 'help_center' },
        redirect: '/faqs',
    },
    {
        title: 'Sobre esta app',
        icon: { ios: 'info.circle', android: 'info' },
        redirect: '/about',
    },
]


export const DASHBOARD_PREFERENCIAS_ITEMS: Items[] = [
    {
        title: 'Idioma',
        icon: { ios: 'globe', android: 'globe' },
    }
]
