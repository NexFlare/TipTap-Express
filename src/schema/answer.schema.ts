export const questionCreateSchema = {
  $schema: "http://json-schema.org/draft-04/schema#",
  type: "object",
  properties: {
    questionId: {
      type: "string",
    },
    answer: {
      type: "string",
    },
  },
  required: ["questionId", "answer"],
};
