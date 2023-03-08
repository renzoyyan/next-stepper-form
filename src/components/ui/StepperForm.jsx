import { StepperContext } from "@/context/StepperContext";
import React, { useContext } from "react";
import { Stepper } from "react-form-stepper";
import { FormProvider, useForm } from "react-hook-form";
import StepOne from "./StepOne";
import StepThree from "./StepThree";
import StepTwo from "./StepTwo";

const StepperForm = () => {
  const { currentData, currentStep } = useContext(StepperContext);
  const methods = useForm({ defaultValues: currentData });

  const steps = [
    <StepOne key={"first"} />,
    <StepTwo key={"second"} />,
    <StepThree key={"third"} />,
  ];

  return (
    <>
      <Stepper
        steps={[{}, {}, {}]}
        activeStep={currentStep}
        stepClassName="stepsClassname"
        styleConfig={{
          borderRadius: "20px",
          activeBgColor: "#FDC765",
          completedBgColor: "#FDC765",
          inactiveBgColor: "#484848",
        }}
        hideConnectors
      />
      <FormProvider {...methods}>
        <div className="max-w-sm mx-auto">{steps[currentStep]}</div>
      </FormProvider>
    </>
  );
};

export default StepperForm;
