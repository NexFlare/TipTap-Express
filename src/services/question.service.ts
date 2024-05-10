import redisClient from "../redisClient";
import {
  MCQRequest,
  MCQResponse,
  MCQUpdateRequest,
  UserType,
} from "../types/question.types";
import { v4 as uuid } from "uuid";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const createMCQ = async (mcq: MCQRequest) => {
  const id = uuid();
  await redisClient.set(`tiptap_mcq:${id}`, JSON.stringify({ ...mcq, id }));
  return {
    ...mcq,
    id,
  };
};

const getAllQuestions = async (userType: UserType) => {
  const keyList = await redisClient.keys("tiptap_mcq:*");

  const result: Array<MCQResponse> = [];
  if (!keyList) {
    return result;
  }
  for (const key of keyList) {
    const value = await redisClient.get(key);
    const entry: MCQResponse = JSON.parse(value);
    if (userType === "VIEWER") {
      entry.options = entry.options.map((option) => ({
        option: option.option,
      }));
    }
    result.push(entry);
  }
  return result;
};

const updateQuestion = async (mcq: MCQUpdateRequest) => {
  const id = mcq.id;
  const response = await redisClient.get(`tiptap_mcq:${id}`);
  if (!response) {
    return null;
  }
  await redisClient.set(`tiptap_mcq:${id}`, JSON.stringify(mcq));
  return mcq;
};

const deleteQuestion = async (id: string) => {
  const response = await redisClient.get(`tiptap_mcq:${id}`);
  if (!response) {
    return false;
  }
  await redisClient.del(`tiptap_mcq:${id}`);
  return true;
};

const generateQuestionUsingAI = async (prompt: string) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const requestPrompt = `Give me a JSON of the question and atlest 2 and atmost 4 options and correct answer for ${prompt}. Follow json template {"question": "What was the Boston Tea Party?", "options": [{"option": "A party in Boston", "isCorrect" : true}]}`;

  const result = await model.generateContent(requestPrompt);
  const response = await result.response;
  const text = response.text();
  try {
    const json = JSON.parse(text);
    return json;
  } catch (err) {
    console.log(err);
  }
};

export default {
  createMCQ,
  getAllQuestions,
  updateQuestion,
  deleteQuestion,
  generateQuestionUsingAI,
};
