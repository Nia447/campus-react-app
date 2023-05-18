import validator from "validator";

const validate = (data) => {
  let errors = {};

  console.log(data);

  if (validator.isEmpty(data.name)) {
    errors.name = "Поле Название курса не должно быть пустым";
  }

  if (validator.isEmpty((data.year).toString())) {
    errors.year = "Поле Год начала курса не должно быть пустым";
  } else if (!validator.isInt((data.year).toString())) {
    errors.year = "Поле Год начала курса должно быть числом";
  } else {
    const thisYear = data.year;
    if (thisYear < 2023 || thisYear > 2030) {
      errors.year = "Поле Год начала курса должно быть от 2023 до 2030";
    }
  }

  if (validator.isEmpty((data.totalNumberOfSeats).toString())) {
    errors.totalNumberOfSeats = "Поле Общее количество мест не должно быть пустым";
  } else if (!validator.isInt((data.totalNumberOfSeats).toString())) {
    errors.totalNumberOfSeats = "Поле Общее количество мест должно быть числом";
  } else {
    const totalSeats = data.totalNumberOfSeats;
    if (totalSeats < 1 || totalSeats > 200) {
      errors.totalNumberOfSeats = "Поле Общее количество мест должно быть от 1 до 200";
    }
  }

  if (validator.isEmpty(data.semester)) {
    errors.semester = "Поле Семестра не должно быть пустым";
  }

  return errors;
};

export default validate;
