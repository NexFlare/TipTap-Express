export const getResponseObject = (
  code: number,
  error: string,
  response: any
) => {
  return {
    code,
    error,
    response,
  };
};
