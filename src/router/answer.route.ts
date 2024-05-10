import { Router } from "express";

import answerController from "../controller/answer.controller";

const answerRouter = Router();

answerRouter.route("/").post(answerController.answerQuestion);

export default answerRouter;
