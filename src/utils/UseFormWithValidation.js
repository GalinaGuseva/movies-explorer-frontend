import { useCallback, useState } from "react";
import { valMessages } from "../constants/valMessages";

export const useFormWithValidation = (inputValues) => {
  const [values, setValues] = useState(inputValues),
    [errors, setErrors] = useState({}),
    [isValid, setIsValid] = useState(true);

  const handleChange = (e) => {
    const input = e.target;
    const { name, value } = input;
    const form = input.closest("form");
    setValues({ ...values, [name]: value });
    setIsValid(form.checkValidity());
    if (name === "name") {
      input.setCustomValidity("");
      if (!input.validity.valid) {
        input.setCustomValidity(valMessages.name);
      }
    }
    if (name === "email") {
      input.setCustomValidity("");
      if (!input.validity.valid) {
        input.setCustomValidity(valMessages.email);
      }
    }
    if (name === "password") {
      input.setCustomValidity("");
      if (!input.validity.valid) {
        input.setCustomValidity(valMessages.password);
      }
    }
    if (name === "query") {
      input.setCustomValidity("");

      if (!input.validity.valid) {
        input.setCustomValidity(valMessages.search);
      }
    }
    errors[name] = input.validationMessage;
    setErrors(errors);
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values,
    errors,
    isValid,
    handleChange,
    resetForm,
    setValues,
    setIsValid,
  };
};
