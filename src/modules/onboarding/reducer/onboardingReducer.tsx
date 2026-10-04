
export interface OnboardingState {
    step: number;
    landingPage: boolean;
    showProgressBar: boolean;
    progressValue: number;
    showBackbutton: boolean;
    register: boolean
    title?: string
    labelOne?: string
    labelTwo?: string
}

export type onboardingActions =
    | { type: "RESET" }
    | { type: "EMPECEMOS" }
    | { type: "HAS_USADO_PICTOGRAMAS" }
    | { type: "QUE_ES_UN_PICTOGRAMA" }
    | { type: "QUE_ES_UN_HORARIO_VISUAL" }
    | { type: "POR_QUE_SON_UTILES" }
    | { type: "REGISTRO" };


export const getInitialState = (): OnboardingState => {
    return {
        step: 0,
        landingPage: true,
        showProgressBar: false,
        progressValue: 0,
        showBackbutton: false,
        register: false
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
            };
        case "HAS_USADO_PICTOGRAMAS":
            return {
                ...state,
                step: 2,
                progressValue: 0.25,
                title: "¿Has usado pictogramas antes?",
                labelOne: "Sí",
                labelTwo: "No",
            };
        /*  */
        default:
            return state;
    }
};
