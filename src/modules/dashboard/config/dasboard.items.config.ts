import { DASHBOARD_ROUTES } from '@/constants/routes/routes'
import { RelativePathString } from 'expo-router'
import type { AndroidSymbol, SFSymbol } from 'expo-symbols'


type Items = {
    title: string
    icon: { ios: SFSymbol; android: AndroidSymbol }
    redirect?: RelativePathString
    onPress?: () => void
}

export const DASHBOARD_CUENTA_ITEMS: Items[] = [
    {
        title: 'Información personal',
        icon: { ios: 'person', android: 'person' },
        redirect: DASHBOARD_ROUTES.myProfile as RelativePathString,
    },
    {
        title: 'Mis fotos',
        icon: { ios: 'photo', android: 'photo' },
        redirect: DASHBOARD_ROUTES.myPhotos as RelativePathString,
    },
    {
        title: 'Horarios guardados',
        icon: { ios: 'calendar', android: 'event' },
        redirect: DASHBOARD_ROUTES.mySchedules as RelativePathString,
    },
    {
        title: 'Mis artículos',
        icon: { ios: 'book', android: 'book' },
        redirect: DASHBOARD_ROUTES.myArticles as RelativePathString,
    },


]

export const DASHBOARD_AYUDA_ITEMS: Items[] = [
    {
        title: 'Preguntas frecuentes',
        icon: { ios: 'questionmark.circle', android: 'help_center' },
        redirect: DASHBOARD_ROUTES.faqs as RelativePathString,
    },
    {
        title: 'Sobre esta app',
        icon: { ios: 'info.circle', android: 'info' },
        redirect: DASHBOARD_ROUTES.about as RelativePathString,
    },
]


export const DASHBOARD_PREFERENCIAS_ITEMS: Items[] = [
    {
        title: 'Idioma',
        icon: { ios: 'globe', android: 'globe' },
    }
]
