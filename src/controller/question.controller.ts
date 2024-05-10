import { Request, Response } from "express";
import {
  MCQRequest,
  MCQUpdateRequest,
  UserType,
} from "../types/question.types";
import questionService from "../services/question.service";
import { Validator } from "jsonschema";
import { catchError } from "../util/catchError";
import { questionCreateSchema } from "../schema/question.schema";
import { getResponseObject } from "../util";

const validator = new Validator();

const createQuestion = async (
  req: Request<{}, {}, MCQRequest>,
  res: Response
) => {
  const mcqRequestObj: MCQRequest = req.body;
  const isRequestValid = validator.validate(
    mcqRequestObj,
    questionCreateSchema,
    {
      allowUnknownAttributes: false,
    }
  );
  if (!isRequestValid.valid) {
    res
      .status(400)
      .send(getResponseObject(400, isRequestValid.errors[0].message, null));
    return;
  }
  const response = await questionService.createMCQ(mcqRequestObj);
  res.status(201).json(getResponseObject(201, null, response));
};

const getAllQuestions = async (
  req: Request<{}, {}, {}, { userType: UserType }>,
  res: Response
) => {
  try {
    const { userType } = req.query;
    const response = await questionService.getAllQuestions(
      userType || "VIEWER"
    );
    res.status(200).json(getResponseObject(200, null, response));
  } catch (error) {
    res.status(500).json(getResponseObject(500, error.message, null));
  }
};

const updateQuestion = async (
  req: Request<{}, {}, MCQUpdateRequest>,
  res: Response
) => {
  try {
    const mcqUpdateRequest: MCQUpdateRequest = req.body;
    const isRequestValid = validator.validate(
      mcqUpdateRequest,
      questionCreateSchema,
      {
        allowUnknownAttributes: false,
      }
    );
    if (!isRequestValid.valid) {
      res
        .status(400)
        .send(getResponseObject(400, isRequestValid.errors[0].message, null));
      return;
    }
    const response = await questionService.updateQuestion(mcqUpdateRequest);
    if (!response) {
      res.status(400).send(getResponseObject(400, "Question not found", null));
      return;
    }
    res.status(200).send(getResponseObject(200, null, response));
  } catch (error) {
    res.status(500).json(getResponseObject(500, error.message, null));
  }
};

const deleteQuestion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await questionService.deleteQuestion(id);
    if (!deleted) {
      res.status(400).send(getResponseObject(400, "Question not found", null));
      return;
    }
    res.status(200).send(getResponseObject(200, null, ""));
  } catch (error) {
    res.status(500).json(getResponseObject(500, error.message, null));
  }
};

const getAIQuestions = async (
  req: Request<{}, {}, {}, { prompt: string }>,
  res: Response
) => {
  try {
    const { prompt } = req.query;
    if (!prompt || prompt === "") {
      res.status(400).send(getResponseObject(400, "Prompt is required", null));
      return;
    }
    const response = await questionService.generateQuestionUsingAI(prompt);
    res.status(200).send(getResponseObject(200, null, response));
  } catch (error) {
    res.status(500).json(getResponseObject(500, error.message, null));
  }
};

export default {
  createQuestion: catchError(createQuestion),
  getAllQuestions: catchError(getAllQuestions),
  updateQuestion: catchError(updateQuestion),
  deleteQuestion: catchError(deleteQuestion),
  getAIQuestions: catchError(getAIQuestions),
};
