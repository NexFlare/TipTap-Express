import answerRouter from "./answer.route";
import questionRouter from "./question.route";
import questionsRouter from "./questions.route";

const router = (app) => {
  app.use("/ping", (_, res) => res.status(200).send("pong"));
  app.use("/api/v1/questions", questionsRouter);
  app.use("/api/v1/question", questionRouter);
  app.use("/api/v1/answer", answerRouter);
};

export default router;
