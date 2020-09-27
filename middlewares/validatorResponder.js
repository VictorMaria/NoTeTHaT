import { validationResult } from 'express-validator';

export const validatorResponder = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorResponse = errors.array({ onlyFirstError: true });
    const errorMessage = errorResponse[0].msg;
    return res.status(400).json({
      success: false,
      errors: errorMessage,
    });
  }
  return next();
};

export default validatorResponder;