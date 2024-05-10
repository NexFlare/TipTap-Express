/**
 *
 * @param fnc
 * @returns
 * a wrapper function that catches error and return a generic
 * obj for it.
 */
export const catchError = (fnc: Function) => {
  return async function (req, res, next) {
    try {
      await fnc(req, res, next);
    } catch (err) {
      console.error(`Error : ${err}`);
      const {
        message = "error",
        code = 500,
        clientMsg = "Something went wrong",
        httpCode = 503,
      } = err;

      res.status(code).send({ message: clientMsg });
    }
  };
};
