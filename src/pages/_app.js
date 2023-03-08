import { StepperProvider } from "@/context/StepperContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <StepperProvider>
        <Component {...pageProps} />
      </StepperProvider>
    </>
  );
}
