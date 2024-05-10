import { Request, Response } from "express";
import answerService from "../services/answer.service";
import { AnswerRequest } from "../types/answer.types";
import { catchError } from "../util/catchError";
import { getResponseObject } from "../util";

const answerQuestion = async (
  req: Request<{}, {}, AnswerRequest>,
  res: Response
) => {
  try {
    const { answer, questionId } = req.body;
    const response = await answerService.processAnswer({ answer, questionId });
    res.status(200).json(getResponseObject(200, null, response));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  answerQuestion: catchError(answerQuestion),
};
