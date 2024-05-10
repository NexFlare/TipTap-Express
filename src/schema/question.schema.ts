export const questionCreateSchema = {
  $schema: "http://json-schema.org/draft-04/schema#",
  type: "object",
  properties: {
    question: {
      type: "string",
      minLength: 5,
    },
    options: {
      type: "array",
      items: [
        {
          type: "object",
          properties: {
            option: {
              type: "string",
              minLength: 1,
            },
            isCorrect: {
              type: "boolean",
            },
          },
          required: ["option", "isCorrect"],
        },
      ],
    },
  },
  required: ["question", "options"],
};

export const questionUpdateSchema = {
  $schema: "http://json-schema.org/draft-04/schema#",
  type: "object",
  properties: {
    ...questionCreateSchema.properties,
    id: {
      type: "string",
      minLength: 1,
    },
  },
  required: ["id", "question", "options"],
};
