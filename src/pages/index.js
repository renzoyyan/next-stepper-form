import dynamic from "next/dynamic";

const StepperForm = dynamic(() => import("../components/ui/StepperForm"), {
  ssr: false,
});

export default function Home() {
  return <StepperForm />;
}
