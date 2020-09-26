import { check, param } from 'express-validator';

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
  ],
  editNote: [
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
  ],
  validateId: [
    param('id')
      .matches((/^[0-9a-f]{24}$/))
      .withMessage('id is not valid'),
  ],
};
export default validate;
