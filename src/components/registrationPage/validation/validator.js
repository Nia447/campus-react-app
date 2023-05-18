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

  if (validator.isEmpty(data.email)) {
    errors.email = "Поле Email не должно быть пустым";
  } else if (!validator.isEmail(data.email)) {
    errors.email = "Некорректный Email";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Поле Пароль не должно быть пустым";
  }

  if (validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = "Поле Повторите пароль не должно быть пустым";
  } else if (!validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = "Пароли не совпадают";
  }

  return errors;
};

export default validate;
