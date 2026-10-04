import { useReducer } from "react";
import { getInitialState, onboardingReducer } from "../reducer/onboardingReducer";


export const useOnboarding = () => {
  const [state, dispatch] = useReducer(onboardingReducer, getInitialState());

  const { 
    landingPage,
    showProgressBar,
    progressValue,
    showBackbutton,
    title,
    justifyTitle,
    labelOne,
    labelTwo,
    customHeight,
    twoButtons,
    buttonVariant,
    icon,
    step,
    body,
    image,
  } = state

  const handleStart = () => {
    dispatch({ type: "EMPECEMOS" });
  }

  const handleBack = () => {
    if (state.step === 1) {
      dispatch({ type: "RESET" });
    } else if (state.step === 2) {
      dispatch({ type: "EMPECEMOS" });
    } else if (state.step === 3) {
      dispatch({ type: "HAS_USADO_PICTOGRAMAS" });
    } else if (state.step === 4) {
      dispatch({ type: "QUE_ES_UN_PICTOGRAMA" });
    } else if (state.step === 5) {
      dispatch({ type: "QUE_ES_UN_HORARIO_VISUAL" });
    }
  }

  const handlePressOne = () => {
    if (state.step === 1) {
      dispatch({ type: "HAS_USADO_PICTOGRAMAS" });
    } else if (state.step === 2) {
      dispatch({ type: "REGISTRO" });
    } else if (state.step === 3) {
      dispatch({ type: "QUE_ES_UN_HORARIO_VISUAL" });
    } else if (state.step === 4) {
      dispatch({ type: "POR_QUE_SON_UTILES" });
    }
  }

  const handlePressTwo = () => {
    if (state.step === 1) {
      dispatch({ type: "HAS_USADO_PICTOGRAMAS" });
    } else if (state.step === 2) {
      dispatch({ type: "QUE_ES_UN_PICTOGRAMA" });
    } 
  }

  return {
    landingPage,
    twoButtons,
    showProgressBar,
    progressValue,
    showBackbutton,
    title,
    justifyTitle,
    labelOne,
    labelTwo,
    customHeight,
    buttonVariant,
    icon,
    step,
    body,
    image,
    
    handleStart,
    handleBack,
    handlePressOne,
    handlePressTwo
  }
}