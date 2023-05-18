import validator from "validator";

const validate = (data, type) => {
  let errors = {};

  if (type === "status" && validator.isEmpty(data)) {
    errors.status = "Поле Статус не должно быть пустым";
  }

  if (type === "notification") {
    if (validator.isEmpty(data.text)) {
      errors.text = "Поле Уведомление не должно быть пустым";
    }
    if (data.isImportant === null) {
      errors.isImportant = "Поле Важность не должно быть пустым";
    } 
  }

  return errors;
};

export default validate;
