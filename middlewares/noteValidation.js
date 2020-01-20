import { check, validationResult } from 'express-validator';

const validate = {
  newNote: [
    check('title')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .trim()
      .withMessage('Title is required')
      .isLength({ min: 1, max: 100 })
      .withMessage('Title must be between 1 to 100 charaters long'),
    check('body')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('Note cannot be empty'),
    check('latitude')
      .optional()
      .isNumeric()
      .withMessage('Latitude must be valid'),
    check('longitude')
      .optional()
      .isNumeric()
      .withMessage('Longitude must be valid'),
    check('street')
      .optional()
      .trim(),
    check('city')
      .optional()
      .trim(),
    check('country')
      .optional()
      .trim(),
    check('idempotencyKey')
      .optional()
      .trim()
      .isUUID()
      .withMessage('Idempotency key must be a valid UUID'),
    (req, res, next) => {
      const errors = validationResult(req);
      const errorMessage = {};
      if (!errors.isEmpty()) {
        errors.array({ onlyFirstError: true }).forEach((error) => {
          errorMessage[error.param] = error.msg;
        });
        return res.status(400).json({
          errors: errorMessage,
        });
      }
      return next();
    },
  ],
};
export default validate;
