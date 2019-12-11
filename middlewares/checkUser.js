import User from '../models/User';

const checkUser = async (req, res, next) => {
  const { email } = req.body;
  try {
    const doesExist = await User.findOne({ email });
    if (doesExist) {
      return res.status(400).json({ errors: { message: 'User already exists' } });
    }
    return next();
  } catch (error) {
    return res.status(500).json({
      errors: {
        message:
            'Oh no! NoTeTHaT! just experienced a little Shock',
      },
    });
  }
};

export default checkUser;
