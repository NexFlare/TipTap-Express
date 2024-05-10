import { Option } from "../types/question.types";

export const getResponseObject = (
  code: number,
  error: string,
  response: any
) => {
  return {
    code,
    error,
    response,
  };
};

export const validateOptions = (options: Array<Option>) => {
  if (options.length < 2 || options.length > 4) {
    return false;
  }
  const optionsSet = {};
  let correctOptionCount = 0;
  options.forEach((option) => {
    optionsSet[option.option] = true;
    if (option.isCorrect) {
      correctOptionCount += 1;
    }
  });
  if (
    Object.keys(optionsSet).length !== options.length ||
    correctOptionCount !== 1
  ) {
    return false;
  }
  return true;
};
