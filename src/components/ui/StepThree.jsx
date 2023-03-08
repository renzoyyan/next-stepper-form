import { StepperContext } from "@/context/StepperContext";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import * as Form from "../forms";

const StepThree = () => {
  const { handleSubmit } = useFormContext();
  const { handlePrevStep } = useContext(StepperContext);

  const onSubmitStepThree = (data) => {
    console.log("third-step data: ", data);
  };
  return (
    <>
      <h1>Authentication</h1>
      <Form.Group>
        <Form.Input
          type="email"
          name="email"
          validation={{ required: "This field is required" }}
        />
      </Form.Group>
      <Form.Group>
        <Form.Input
          type="password"
          name="password"
          validation={{ required: "This field is required" }}
        />
      </Form.Group>

      <div className="space-x-4">
        <button type="button" onClick={handlePrevStep}>
          Back
        </button>
        <button type="submit" onClick={handleSubmit(onSubmitStepThree)}>
          Submit
        </button>
      </div>
    </>
  );
};

export default StepThree;
