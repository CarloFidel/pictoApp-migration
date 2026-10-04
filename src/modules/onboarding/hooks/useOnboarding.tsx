import { useReducer } from "react";
import { getInitialState, onboardingReducer } from "../reducer/onboardingReducer";


export const useOnboarding = () => {
  const [state, dispatch] = useReducer(onboardingReducer, getInitialState());

  const { landingPage, showProgressBar, progressValue, showBackbutton, title, labelOne, labelTwo } = state

  const handleStart = () => {
    dispatch({ type: "EMPECEMOS" });
  }

  const handleBack = () => {
    if (state.step === 1) {
      dispatch({ type: "RESET" });
    } else if (state.step === 2) {
      dispatch({ type: "EMPECEMOS" });
    }
  }

  const handlePressOne = () => {
    if (state.step === 1) {
      dispatch({ type: "HAS_USADO_PICTOGRAMAS" });
    } else if (state.step === 2) {
      dispatch({ type: "REGISTRO" });
    } else {
      dispatch({ type: "RESET" });
    }
  }

  const handlePressTwo = () => {
    if (state.step === 1) {
      dispatch({ type: "HAS_USADO_PICTOGRAMAS" });
    } else if (state.step === 2) {
      dispatch({ type: "QUE_ES_UN_PICTOGRAMA" });
    } else if (state.step === 3) {
      dispatch({ type: "QUE_ES_UN_HORARIO_VISUAL" });
    } else if (state.step === 4) {
      dispatch({ type: "POR_QUE_SON_UTILES" });
    } else if (state.step === 5) {
      dispatch({ type: "REGISTRO" });
    } else {
      dispatch({ type: "RESET" });
    }
  }

  return {
    landingPage,
    showProgressBar,
    progressValue,
    showBackbutton,
    title,
    labelOne,
    labelTwo,

    handleStart,
    handleBack,
    handlePressOne,
    handlePressTwo
  }
}