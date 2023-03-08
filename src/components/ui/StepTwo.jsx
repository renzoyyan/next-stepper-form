import { StepperContext } from "@/context/StepperContext";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import * as Form from "../forms";

const StepTwo = () => {
  const { handleSubmit } = useFormContext();
  const { handleNextStep, handlePrevStep } = useContext(StepperContext);

  const onSubmitStepTwo = (data) => {
    console.log("second-step data: ", data);
    handleNextStep(data);
  };
  return (
    <>
      <h1>What do you do?</h1>

      <Form.Group>
        <Form.Select
          name="occupation"
          options={[
            { value: "student", label: "Student" },
            { value: "employee", label: "Employee" },
          ]}
          validation={{ required: "This field is required" }}
        />
      </Form.Group>
      <Form.Group>
        <Form.Input name="city" />
      </Form.Group>

      <div className="space-x-4">
        <button type="button" onClick={handlePrevStep}>
          Back
        </button>
        <button type="submit" onClick={handleSubmit(onSubmitStepTwo)}>
          Next
        </button>
      </div>
    </>
  );
};

export default StepTwo;
