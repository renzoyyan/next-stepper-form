import { classNames } from "@/utils/utils";
import { useFormContext } from "react-hook-form";

const Input = ({
  name = "",
  label = "",
  type = "text",
  divClass = "",
  className = "",
  placeholder = "",
  autoComplete = "off",
  icon,
  initialValue,
  validation,
  ...inputProps
}) => {
  const {
    register,
    formState: { errors },
    getFieldState,
  } = useFormContext();

  const { error } = getFieldState(name);

  return (
    <>
      {label && (
        <label htmlFor={name} className="label">
          {label}
        </label>
      )}
      <div
        className={classNames(
          "flex items-center justify-between bg-white group disabled:bg-transparent pr-b1.5 form-control",
          error && "form-error"
        )}
      >
        <input
          {...register(name, validation)}
          type={type}
          min={type === "number" ? 0 : undefined}
          className={classNames(
            className,
            "w-full outline-none disabled:bg-transparent pl-b1.5 py-b05 rounded-md"
          )}
          placeholder={placeholder}
          name={name}
          id={name}
          autoComplete={autoComplete}
          {...inputProps}
        />
        <span>{icon}</span>
      </div>

      {error && <div className="error-msg">{error.message}</div>}
    </>
  );
};

export default Input;
