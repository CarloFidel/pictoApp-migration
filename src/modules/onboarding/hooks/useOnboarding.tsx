import { useReducer, useRef } from "react";
import { getInitialState, onboardingReducer } from "../reducer/onboardingReducer";


export const useOnboarding = () => {
  const [state, dispatch] = useReducer(onboardingReducer, getInitialState());

  const stepRef = useRef(state.step);
  const previousStepRef = useRef(state.step);

  if (stepRef.current !== state.step) {
    previousStepRef.current = stepRef.current;
    stepRef.current = state.step;
  }

  const previousStep = previousStepRef.current;

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
    register,
    iconGoogle,
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
    } else if (state.step === 6 && previousStep !== 2) {
      dispatch({ type: "POR_QUE_SON_UTILES" });
    } else if ( previousStep === 2 && state.step === 6 ) {
      dispatch({ type: "HAS_USADO_PICTOGRAMAS" });
    }
  }

  const handlePressOne = () => {
    if (state.step === 1) {
      dispatch({ type: "HAS_USADO_PICTOGRAMAS" });
    } else if (state.step === 2) {
      dispatch({ type: "REGISTER" });
    } else if (state.step === 3) {
      dispatch({ type: "QUE_ES_UN_HORARIO_VISUAL" });
    } else if (state.step === 4) {
      dispatch({ type: "POR_QUE_SON_UTILES" });
    } else if (state.step === 5) {
      dispatch({ type: "REGISTER" });
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
    register,
    iconGoogle,
    
    handleStart,
    handleBack,
    handlePressOne,
    handlePressTwo
  }
}