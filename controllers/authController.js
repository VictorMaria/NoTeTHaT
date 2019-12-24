import gravatar from 'gravatar';
import User from '../models/User';
import Auth from '../helpers/auth';
import serverResponse from '../modules/serverResponse';

const { newToken, hashPassword, comparePassword } = Auth;
const { successResponse, serverErrorResponse } = serverResponse;

class AuthController {
  static async signUp(req, res) {
    const {
      firstName,
      lastName,
      email,
      password,
    } = req.body;
    // Fetch user avatar from gravatar
    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm',
    });
    // An instance of User
    const user = new User({
      firstName,
      lastName,
      email,
      password,
      avatar,
    });
    user.password = hashPassword(password);
    // Saving new user instance into the db
    try {
      await user.save();
      // Payload for the new user's token
      const payload = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        avatar: user.avatar,
      };
      const token = newToken(payload);
      return successResponse(res, 201, 'token', token);
    } catch (err) {
      return serverErrorResponse(err, req, res);
    }
  }

  static async signIn(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ errors: { message: 'Incorrect Credentials' } });
      }
      const result = comparePassword(password, user.password);
      if (!result) {
        return res.status(401).json({ errors: { message: 'Incorrect Credentials' } });
      }
      const payload = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        avatar: user.avatar,
      };
      const token = newToken(payload);
      return successResponse(res, 200, 'user', { message: 'You have Successfully Signed In', token });
    } catch (err) {
      return serverErrorResponse(err, req, res);
    }
  }
}

export default AuthController;
