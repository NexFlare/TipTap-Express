import redisClient from "../redisClient";
import { AnswerRequest } from "../types/answer.types";
import { MCQResponse } from "../types/question.types";

const processAnswer = async (answerRequest: AnswerRequest) => {
  const response = await redisClient.get(
    `tiptap_mcq:${answerRequest.questionId}`
  );
  if (!response) throw new Error("Question not found");
  const result: MCQResponse = JSON.parse(response);
  const correctOption = result.options.find((option) => option.isCorrect);
  return {
    isCorrect: correctOption?.option === answerRequest.answer,
  };
};

export default {
  processAnswer,
};
