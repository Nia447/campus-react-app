import validator from "validator";

const validate = (data) => {
  let errors = {};

  if (validator.isEmpty(data)) {
    errors.nameGroup = "Поле Название группы не должно быть пустым";
  }

  return errors;
};

export default validate;
