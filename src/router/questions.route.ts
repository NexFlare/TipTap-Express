import { Router } from "express";
import questionContoller from "../controller/question.controller";

const questionsRouter = Router();

questionsRouter.route("/").get(questionContoller.getAllQuestions);

export default questionsRouter;
