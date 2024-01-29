import PropTypes from "prop-types";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { KeyFilterType } from "primereact/keyfilter";
import { toInputUppercase } from "../../helpers/helpers";

interface FormInputTextProps {
  name: string;
  label: string;
  className?: string;
  values?: string;
  isrequired?: boolean | string;
  maxLength?: number;
  keyfilter?: KeyFilterType;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  rules?: unknown;
}

export const FormInputText = ({
  label,
  values,
  ...props
}: FormInputTextProps) => {
  const methods = useFormContext();
  const {
    control,
    formState: { errors },
  } = methods;

  return (
    <Controller
      name={props.name || ""}
      control={control}
      render={({ field: { value }, fieldState }) => (
        <div className={props.className}>
          <span className="p-float-label ">
            <InputText
              className={classNames({
                "p-invalid": fieldState.error,
              })}
              {...props}
              {...methods.register(props.name)}
              value={values ? values : value || ""}
              autoComplete="off"
              maxLength={props.maxLength || 100}
              keyfilter={props.keyfilter || "alphanum"}
              onInput={toInputUppercase}
            />
            <label
              htmlFor={label || ""}
              className={`ml-2 ${props.isrequired ? "-mt-4" : "-mt-4"} `}
              style={{ fontFamily: "inherit" }}
            >
              <p className="text-md">
                {label}
                {props.isrequired ? (
                  <span
                    className="text-xl "
                    style={{ color: "red", marginLeft: "5px" }}
                  >
                    *
                  </span>
                ) : null}
              </p>
            </label>
          </span>
          <ErrorMessage
            errors={errors}
            name={props.name}
            render={({ message }) => (
              <small className="p-error">{message}</small>
            )}
          />
        </div>
      )}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      rules={props.rules}
    />
  );
};

FormInputText.prototype = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
};
