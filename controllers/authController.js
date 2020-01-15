/* eslint-disable no-underscore-dangle */
import dotenv from 'dotenv';
import User from '../models/User';
import Auth from '../helpers/auth';
import serverResponse from '../modules/serverResponse';
import avatarFetcher from '../helpers/avatarFetcher';

dotenv.config();

const liveFrontendURL = process.env.frontendURL;
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
    const avatar = avatarFetcher(email);
    // An instance of User
    const user = new User({
      firstName,
      lastName,
      email: email.toLowerCase(),
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
      return successResponse(res, 201, 'user', { message: 'You have Successfully Signed Up', token });
    } catch (err) {
      return serverErrorResponse(err, req, res);
    }
  }

  static async signIn(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email: email.toLowerCase() });
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

  static async googleAuth(req, res) {
    const userData = req.user._json;
    const firstName = userData.given_name;
    const lastName = userData.family_name;
    const { email } = userData;
    const avatar = avatarFetcher(email);
    try {
      const doesUserExist = await User.findOne({ email });
      if (!doesUserExist) {
        const user = new User({
          firstName,
          lastName,
          email,
          avatar,
        });
        await user.save();
        const payload = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          avatar: user.avatar,
        };
        const token = newToken(payload);
        return res.redirect(`${liveFrontendURL}/signup?token=${token}`);
      }
      const payload = {
        id: doesUserExist.id,
        firstName: doesUserExist.firstName,
        lastName: doesUserExist.lastName,
        email: doesUserExist.email,
        avatar: doesUserExist.avatar,
      };
      const token = newToken(payload);
      return res.redirect(`${liveFrontendURL}/signin?token=${token}`);
    } catch (err) {
      return serverErrorResponse(err, req, res);
    }
  }
}

export default AuthController;
