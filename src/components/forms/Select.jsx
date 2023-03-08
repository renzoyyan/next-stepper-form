import { Fragment, useState, useCallback } from "react";
import { Combobox, Popover, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { Controller, useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useEffect, useMemo } from "react";

import { classNames } from "@/utils/utils";

function LoadingSpinner() {
  return (
    <svg
      className="w-5 h-5 text-gray-500 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
}

const Select = ({
  options = [],
  name = "",
  label = "",
  placeholder = "",
  className = "",
  disabled = false,
  multiple = false,
  positionValue = "inside" || "outside",
  validation,
  showAbove = false,
  isLoading,
  creatable = false,
}) => {
  const [query, setQuery] = useState("");

  const {
    control,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();

  const selectedValues = watch(name);

  const filteredOptions = useMemo(
    () =>
      query === ""
        ? options
        : options.filter((option) => {
            return option.label.toLowerCase().includes(query.toLowerCase());
          }),
    [options, query]
  );

  const removeItem = useCallback(
    (value) => {
      const removedSelection = selectedValues.filter(
        (selected) => selected !== value
      );
      setValue(name, removedSelection);
    },
    [setValue, name, selectedValues]
  );

  useEffect(() => {
    if (selectedValues === undefined) {
      setValue(name, multiple ? [] : "");
    }
  }, [setValue, name, selectedValues, multiple]);

  return (
    <Popover>
      <Controller
        name={name}
        control={control}
        rules={validation}
        render={({ field }) => (
          <Combobox
            value={field.value}
            onChange={(e) => field.onChange(e)}
            disabled={disabled}
            multiple={multiple}
            nullable
          >
            <div className={classNames(className, "relative")}>
              <div className="space-y-1">
                <Combobox.Label className="label">{label}</Combobox.Label>
                <Combobox.Button
                  as="div"
                  className={classNames(
                    "form-control form-input flex items-center justify-between",
                    disabled &&
                      "focus-within:border-com3 focus:border-com3 focus-within:ring-com3 focus:ring-com3",
                    errors[name] && "form-error"
                  )}
                >
                  <Combobox.Input
                    onChange={(event) => setQuery(event.target.value)}
                    displayValue={
                      positionValue === "inside" &&
                      ((option) => {
                        if (multiple) {
                          const filter = options?.filter((opt) =>
                            (option || []).includes(opt.value)
                          );

                          const data = filter
                            .map((opt) => opt.label)
                            .join(", ");
                          return data;
                        } else {
                          const data = options.find(
                            (opt) => opt.value === option
                          );
                          return data?.label;
                        }
                      })
                    }
                    className="w-full bg-transparent outline-none"
                    autoComplete="off"
                    placeholder={placeholder}
                  />
                  {isLoading && <LoadingSpinner />}

                  <span className="flex items-center flex-shrink-0 pointer-events-none ">
                    <ChevronDownIcon
                      className={`w-5 h-5 text-com2`}
                      aria-hidden="true"
                    />
                  </span>
                </Combobox.Button>

                {errors[name] && (
                  <div className="error-msg">
                    <ErrorMessage errors={errors} name={name} />
                  </div>
                )}
              </div>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setQuery("")}
                className={classNames(
                  "absolute z-50 w-full py-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm",
                  showAbove ? "bottom-0 mb-1" : "mt-1"
                )}
              >
                <Combobox.Options
                  className={`absolute z-50 py-1 w-full mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm`}
                >
                  {creatable && filteredOptions.length === 0 ? (
                    <Combobox.Option value={query.toLowerCase()}>
                      <div
                        className={classNames(
                          "relative cursor-pointer hover:text-white text-com2 hover:bg-darkgray",
                          query.length > 0 ? "py-2 px-4" : ""
                        )}
                      >
                        {query.length > 0 && (
                          <span>Create &quot;{query}&quot;</span>
                        )}
                      </div>
                    </Combobox.Option>
                  ) : null}

                  {isLoading ? (
                    <p className="relative py-2 pl-4 pr-4 cursor-default select-none text-com2">
                      ...
                    </p>
                  ) : (
                    filteredOptions.length === 0 &&
                    query !== "" && (
                      <div className="relative px-4 py-2 cursor-default select-none text-com2">
                        Nothing found.
                      </div>
                    )
                  )}

                  {filteredOptions.length > 0 &&
                    filteredOptions?.map((option, idx) => (
                      <Combobox.Option
                        key={idx}
                        value={option.value}
                        as={Fragment}
                      >
                        {({ active, selected }) => (
                          <li
                            className={classNames(
                              "relative cursor-default select-none py-2 pl-3 pr-4 font-medium flex items-center gap-x-2",
                              active
                                ? "bg-darkgray text-white"
                                : "text-darkgray",
                              selected && "bg-darkgray text-white"
                            )}
                          >
                            <span
                              className={classNames(
                                selected ? "font-medium" : "font-normal",
                                "block pl-8"
                              )}
                            >
                              {option.label}
                            </span>
                            {selected && (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3`}
                              >
                                <CheckIcon
                                  className="w-5 h-5"
                                  aria-hidden="true"
                                />
                              </span>
                            )}
                          </li>
                        )}
                      </Combobox.Option>
                    ))}
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>
        )}
      />
    </Popover>
  );
};

export default Select;
