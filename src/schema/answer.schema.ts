export const answerSchema = {
  $schema: "http://json-schema.org/draft-04/schema#",
  type: "object",
  properties: {
    questionId: {
      type: "string",
      minLength: 1,
    },
    answer: {
      type: "string",
      minLength: 1,
    },
  },
  required: ["questionId", "answer"],
};
