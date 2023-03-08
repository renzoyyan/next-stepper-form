import { createContext, useState } from "react";

export const StepperContext = createContext();

const INITIAL_STATE = {
  first_name: "",
  last_name: "",
  occupation: "",
  city: "",
  email: "",
  password: "",
};

export const StepperProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentData, setCurrentData] = useState(INITIAL_STATE);

  const handleNextStep = (newData) => {
    setCurrentData((prev) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = (newData) => {
    setCurrentData((prev) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => prev - 1);
  };

  const obj = {
    currentStep,
    setCurrentStep,
    currentData,
    handleNextStep,
    handlePrevStep,
  };

  return (
    <StepperContext.Provider value={obj}>{children}</StepperContext.Provider>
  );
};
