import { Router } from "express";
import questionContoller from "../controller/question.controller";

const questionRouter = Router();

questionRouter
  .route("/")
  .post(questionContoller.createQuestion)
  .put(questionContoller.updateQuestion);

questionRouter.route("/ai").get(questionContoller.getAIQuestions);

questionRouter.route("/:id").delete(questionContoller.deleteQuestion);

export default questionRouter;
