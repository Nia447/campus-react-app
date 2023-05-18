import validator from "validator";

const validate = (data) => {
  let errors = {};

  if (validator.isEmpty(data.fullName)) {
    errors.fullName = "Поле ФИО не должно быть пустым";
  } else if (!validator.matches(data.fullName, /^[a-zA-Zа-яА-ЯёЁ]+(\s+[a-zA-Zа-яА-ЯёЁ]+){1,2}$/)) {
    errors.fullName = "Поле ФИО должно содержать 2 или 3 слова";
  }

  if (validator.isEmpty(data.birthDate)) {
    errors.birthDate = "Поле Дата рождения не должно быть пустым";
  } else if (!validator.isBefore(data.birthDate)) {
    errors.birthDate = "Дата рождения не может быть позже текущей даты";
  }

  return errors;
};

export default validate;
