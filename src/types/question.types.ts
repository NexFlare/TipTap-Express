export interface Option {
  option: string;
  isCorrect?: boolean;
}

export interface MCQRequest {
  question: string;
  options: Option[];
}

export interface MCQResponse extends MCQRequest {
  id: string;
}

export type MCQUpdateRequest = MCQResponse;

export type UserType = "EDITOR" | "VIEWER";
