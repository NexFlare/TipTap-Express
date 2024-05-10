// tests/createQuestion.test.ts
import request from "supertest";
import app from "../src/app";
import { MCQRequest, MCQUpdateRequest } from "../src/types/question.types";
import redisClient, { disconnectRedisClient } from "../src/redisClient";

describe("Test Question lifecycle", () => {
  let questionId = "";
  afterAll(async () => {
    await redisClient.flushAll();
    await disconnectRedisClient();
  });
  it("should validate request and create a question", async () => {
    const questionData: MCQRequest = {
      question: "What is the capital of France?",
      options: [
        { option: "Paris", isCorrect: true },
        { option: "Berlin", isCorrect: false },
        { option: "London", isCorrect: false },
        { option: "Madrid", isCorrect: false },
      ],
    };

    let response = await request(app)
      .post("/api/v1/question")
      .send(questionData);

    expect(response.status).toBe(201);
    questionId = response.body.response.id;
    expect(response.body.response).toHaveProperty(
      "question",
      questionData.question
    );
  });

  it("should return 400 for invalid data", async () => {
    const invalidData = {};

    const response = await request(app)
      .post("/api/v1/question")
      .send(invalidData);

    expect(response.status).toBe(400);
  });

  it("should retrieve all questions", async () => {
    const response = await request(app).get("/api/v1/question");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("response");
    expect(Array.isArray(response.body.response)).toBe(true);
  });

  it("should update the question", async () => {
    const questionData: MCQUpdateRequest = {
      question: "What is the capital of India?",
      options: [
        { option: "New Delhi", isCorrect: true },
        { option: "Berlin", isCorrect: false },
        { option: "London", isCorrect: false },
        { option: "Madrid", isCorrect: false },
      ],
      id: questionId,
    };

    let response = await request(app)
      .put(`/api/v1/question`)
      .send(questionData);

    expect(response.status).toBe(200);
    expect(response.body.response).toHaveProperty(
      "question",
      questionData.question
    );
  });

  it("should return 400 for invalid data when invalid ID provided", async () => {
    const invalidData = {
      question: "What is the capital of India?",
      options: [
        { option: "New Delhi", isCorrect: true },
        { option: "Berlin", isCorrect: false },
        { option: "London", isCorrect: false },
        { option: "Madrid", isCorrect: false },
      ],
      id: 1,
    };

    const response = await request(app)
      .put("/api/v1/question")
      .send(invalidData);

    expect(response.status).toBe(400);
  });

  it("should return 400 for invalid data for missing required data", async () => {
    const invalidData = {
      question: "What is the capital of India?",
      id: 1,
    };

    const response = await request(app)
      .put("/api/v1/question")
      .send(invalidData);
    expect(response.status).toBe(400);
  });

  it("should delete the question", async () => {
    const response = await request(app).delete(
      `/api/v1/question/${questionId}`
    );
    expect(response.status).toBe(200);
  });

  it("should throw error for invalid id when deleting the question", async () => {
    const response = await request(app).delete(`/api/v1/question${questionId}`);
    expect(response.status).toBe(400);
  });
});
