
export interface OnboardingState {
    step: number;
    twoButtons: boolean
    landingPage: boolean;
    showProgressBar: boolean;
    progressValue: number;
    showBackbutton: boolean;
    register: boolean
    title?: string
    labelOne?: string
    labelTwo?: string
    customHeight?: number
    icon?: { ios: string, android: string }
    buttonVariant: 'outline' | 'filled' | 'alert';
    justifyTitle: 'center' | 'start' | 'end';
    body?: string[];
    image?: boolean;
    iconGoogle?: boolean;
}

export type onboardingActions =
    | { type: "RESET" }
    | { type: "EMPECEMOS" }
    | { type: "HAS_USADO_PICTOGRAMAS" }
    | { type: "QUE_ES_UN_PICTOGRAMA" }
    | { type: "QUE_ES_UN_HORARIO_VISUAL" }
    | { type: "POR_QUE_SON_UTILES" }
    | { type: "REGISTER" };


export const getInitialState = (): OnboardingState => {
    return {
        step: 0,
        landingPage: true,
        showProgressBar: false,
        progressValue: 0,
        showBackbutton: false,
        register: false,
        customHeight: 270,
        twoButtons: true,
        buttonVariant: "outline",
        justifyTitle: 'start',




    };
};


export const onboardingReducer = (state: OnboardingState, action: onboardingActions): OnboardingState => {

    switch (action.type) {
        case "RESET":
            return getInitialState();

        case "EMPECEMOS":
            return {
                ...state,
                step: 1,
                landingPage: false,
                showProgressBar: true,
                progressValue: 0,
                showBackbutton: true,
                title: "¿Qué eres?",
                labelOne: "Terapeuta",
                labelTwo: "Paciente",
                customHeight: 270,
                buttonVariant: "outline",
                twoButtons: true,
                justifyTitle: 'start',
                icon: undefined,
                body: undefined,
                image: false,
                register: false,
            };
        case "HAS_USADO_PICTOGRAMAS":
            return {
                ...state,
                step: 2,
                progressValue: 0.2,
                title: "¿Has usado pictogramas antes?",
                labelOne: "Sí",
                labelTwo: "No",
                customHeight: 320,
                justifyTitle: 'start',
                buttonVariant: "outline",
                twoButtons: true,
                icon: undefined,
                body: undefined,
                image: false,
                register: false,
                };


        case "QUE_ES_UN_PICTOGRAMA":
            return {
                ...state,
                step: 3,
                progressValue: 0.4,
                title: "¿Qué es un pictograma?",
                labelOne: "Continuar",
                customHeight: 580,
                twoButtons: false,
                buttonVariant: "filled",
                icon: { ios: 'arrow.forward.circle', android: 'arrow_circle_right' },
                justifyTitle: 'center',
                body: [
                    "Es una imagen sencilla que representa un objeto, una acción o un concepto de forma visual y clara.",
                    "Ejemplo de un pictograma:",
                ],
                image: true,
                register: false,
            };



        case "QUE_ES_UN_HORARIO_VISUAL":
            return {
                ...state,
                step: 4,
                progressValue: 0.6,
                title: "¿Qué es un horario visual?",
                labelOne: "Continuar",
                customHeight: 500,
                twoButtons: false,
                buttonVariant: "filled",
                icon: { ios: 'arrow.forward.circle', android: 'arrow_circle_right' },
                justifyTitle: 'center',
                body: [
                    "Es una herramienta que organiza las actividades del día utilizando pictogramas.",
                    "Se usan para hacer que una rutina sea más clara y anticipar lo que ocurrirá.",
                    "Gracias a los horarios visuales, se reduce el grado de ansiedad y posibles problemas de conducta.",
                ],
                image: false,
                register: false,
            };
        case "POR_QUE_SON_UTILES":
            return {
                ...state,
                step: 5,
                progressValue: 0.8,
                title: "¿Por qué son útiles?",
                labelOne: "Continuar",
                customHeight: 580,
                twoButtons: false,
                buttonVariant: "filled",
                icon: { ios: 'arrow.forward.circle', android: 'arrow_circle_right' },
                justifyTitle: 'center',
                body: [
                    "Las personas con autismo comprenden mejor la información visual que las palabras.",
                    "Los horarios visuales cubren dos necesidades:",
                    "• Presentan la información de forma visual, ya que están hechos con pictogramas.",
                    "• Ayudan a estructurar y organizar las actividades del día, proporcionando una rutina clara.",
                ],
                image: false,
                register: false,
            };


        case "REGISTER":
            return {
                ...state,
                step: 6,
                progressValue: 1,
                register: true,
                title: "Regístrate",
                customHeight: 300,
                body: undefined,
                twoButtons: false,
                iconGoogle: true,
            };

            default:
                return state;
        }
    };
