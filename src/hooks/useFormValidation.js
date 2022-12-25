import { useState } from "react";

//хук управления формой и валидации формы
export function useFormWithValidation(defaultValues = {}, config) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    const isNotValidValue = !config?.REGEX[name]?.test(value); //Поиск сопоставления регулярного выражения указанной строке (возвращает true или false).

    setValues({ ...values, [name]: value });

    isNotValidValue && config?.INPUTS.includes(name) && value.length
      ? setErrors({ ...errors, [name]: config.MESSAGES[name] })
      : setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
  };
  return { values, handleChange, errors, isValid, setIsValid };
}
