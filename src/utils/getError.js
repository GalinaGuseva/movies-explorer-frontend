import { errorMessages } from "../constants/constants";

export const getError = (err) => {
  if (err === 'Error: Ошибка 400') {
    return errorMessages[400];
  }
  if (err === 'Ошибка 401') {
    return errorMessages[401];
  }
  if (err ===  'Ошибка 404') {
    return errorMessages[404];
  }
  if (err === 'Ошибка: 409') {
    return errorMessages[409];
  }
  if (err ===  'Ошибка 500') {
    return errorMessages[500];
  }
};
