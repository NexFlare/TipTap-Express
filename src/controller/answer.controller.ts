import { Request, Response } from "express";
import answerService from "../services/answer.service";
import { AnswerRequest } from "../types/answer.types";
import { catchError } from "../util/catchError";
import { getResponseObject } from "../util";
import { Validator } from "jsonschema";
import { answerSchema } from "../schema/answer.schema";

const validator = new Validator();

const answerQuestion = async (
  req: Request<{}, {}, AnswerRequest>,
  res: Response
) => {
  try {
    const { answer, questionId } = req.body;
    const isRequestValid = validator.validate(req.body, answerSchema, {
      allowUnknownAttributes: false,
    });
    if (!isRequestValid.valid) {
      throw new Error(
        isRequestValid.errors.map((e) => `${e.path[0]} ${e.message}`).join(", ")
      );
    }
    const response = await answerService.processAnswer({ answer, questionId });
    res.status(200).json(getResponseObject(200, null, response));
  } catch (error) {
    res.status(400).json(getResponseObject(400, error.message, ""));
  }
};

export default {
  answerQuestion: catchError(answerQuestion),
};
