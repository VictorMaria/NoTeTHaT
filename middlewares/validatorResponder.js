import { validationResult } from 'express-validator';

export const validatorResponder = (req, res, next) => {
  const errors = validationResult(req);
  const errorDetails = {};
  if (!errors.isEmpty()) {
    const errorResponse = errors.array({ onlyFirstError: true });
    errorDetails.message = errorResponse[0].msg;
    return res.status(400).json({
      success: false,
      errors: errorDetails,
    });
  }
  return next();
};

export default validatorResponder;