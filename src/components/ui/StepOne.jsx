import { StepperContext } from "@/context/StepperContext";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import * as Form from "../forms";

const StepOne = () => {
  const { handleSubmit } = useFormContext();
  const { handleNextStep } = useContext(StepperContext);

  const onSubmitStepOne = (data) => {
    console.log("first-step data: ", data);
    handleNextStep(data);
  };

  return (
    <>
      <h1>Personal Information</h1>

      <div className="space-y-4">
        <Form.Group>
          <Form.Input
            name="first_name"
            validation={{ required: "This field is required" }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Input
            name="last_name"
            validation={{ required: "This field is required" }}
          />
        </Form.Group>

        {/* <div className="space-x-4"> */}
        {/* <button type="button">Back</button> */}
        <button type="submit" onClick={handleSubmit(onSubmitStepOne)}>
          Next
        </button>
        {/* </div> */}
      </div>
    </>
  );
};

export default StepOne;
