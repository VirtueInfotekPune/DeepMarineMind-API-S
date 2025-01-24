import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { UserModel } from '../../../models/user';
import { dataLogger, errorLogger, infoLogger } from '../../../core/logger';
import { catchResponse, failureResponse, successResponse } from '../../../core/response';
import axios from 'axios'
import mongooseService from '../../../services/mongoose';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const handleGoogleSignup = async (req: any, res: any) => {
  try {
    infoLogger("START: handleGoogleSignup function");
    dataLogger("req.body", req.body);

    const { token } = req.body;

    if (!token) {
      const response = failureResponse({
        handler: "auth",
        messageCode: "E034",
        req: req,
      });
      return res.status(response?.statusCode).send(response);
    }

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email || !payload.name) {
      const response = failureResponse({
        handler: "auth",
        messageCode: "E035",
        req: req,
      });
      return res.status(response?.statusCode).send(response);
    }

    const { email, name, picture } = payload;

    // Check if user exists
    // let user = await UserModel.findOne({ email });
    let user = await mongooseService.findOne(UserModel, { email });
    if (!user) {
      // Create a new user if not exists
      user = await mongooseService.save(UserModel,{
        email,
        name,
        image: picture || '',
        type: 'candidate',
      });

    }

    // Generate JWT token
    const jwtToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name,
        type: user.type,
      },
      process.env.JWT_ACCESS_SECRET as string,
      {
        expiresIn: '1m',
      }
    );

    const response = successResponse({
      handler: "auth",
      messageCode: "S003",
      req: req,
      data: {
        accessToken: jwtToken,
        userData: user,
      },
    });
    return res.status(response?.statusCode).send(response);
  } catch (error) {
    errorLogger("Error in handleGoogleSignup function", error);
    const response = catchResponse({
      handler: "auth",
      messageCode: "E036",
      req: req,
      error: error,
    });
    return res.status(response?.statusCode).send(response);
  }
};

export const handleGoogleLogin = async (req: any, res: any) => {
  try {
    infoLogger("START: handleGoogleLogin function");
    dataLogger("req.body", req.body);

    const { token } = req.body;

    if (!token) {
      const response = failureResponse({
        handler: "auth",
        messageCode: "E034", 
        req: req,
      });
      return res.status(response?.statusCode).send(response);
    }

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      const response = failureResponse({
        handler: "auth",
        messageCode: "E035", 
        req: req,
      });
      return res.status(response?.statusCode).send(response);
    }

    const { email } = payload;

    // Check if user exists
    const user = await mongooseService.findOne(UserModel, { email });
    if (!user) {
      const response = failureResponse({
        handler: "auth",
        messageCode: "E008", 
        req: req,
      });
      return res.status(response?.statusCode).send(response);
    }

    // Generate JWT token
    const jwtToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name,
        type: user.type,
      },
      process.env.JWT_ACCESS_SECRET as string,
      {
        expiresIn: '1d',
      }
    );

    const response = successResponse({
      handler: "auth",
      messageCode: "S005",
      req: req,
      data: {
        accessToken: jwtToken,
        userData: user,
      },
    });
    return res.status(response?.statusCode).send(response);
  } catch (error) {
    errorLogger("Error in handleGoogleLogin function", error);
    const response = catchResponse({
      handler: "auth",
      messageCode: "E036",
      req: req,
      error: error,
    });
    return res.status(response?.statusCode).send(response);
  }
};



const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;
const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET;
const LINKEDIN_REDIRECT_URI = process.env.LINKEDIN_REDIRECT_URI;

export const handleLinkedinSignup = async (req: any, res: any) => {
  try {
    infoLogger('START: handleLinkedinSignup function');
    dataLogger('req.body', req.body);

    const { code } = req.body;

    if (!code) {
      const response = failureResponse({
        handler: 'auth',
        messageCode: 'E037',
        req,
      });
      return res.status(response?.statusCode).send(response);
    }

    // Step 1: Exchange authorization code for access token
    let tokenResponse;
    try {
      tokenResponse = await axios.post(
        'https://www.linkedin.com/oauth/v2/accessToken',
        null,
        {
          params: {
            grant_type: 'authorization_code',
            code,
            redirect_uri: LINKEDIN_REDIRECT_URI,
            client_id: LINKEDIN_CLIENT_ID,
            client_secret: LINKEDIN_CLIENT_SECRET,
          },
        }
      );
    } catch (err) {
      errorLogger('Error fetching access token', err);
      const response = failureResponse({
        handler: 'auth',
        messageCode: 'E038',
        req,
      });
      return res.status(response?.statusCode).send(response);
    }

    const { access_token } = tokenResponse.data;

    if (!access_token) {
      const response = failureResponse({
        handler: 'auth',
        messageCode: 'E039',
        req,
      });
      return res.status(response?.statusCode).send(response);
    }

    // Step 2: Fetch user profile and email from LinkedIn's userinfo endpoint
    let profileResponse;
    try {
      profileResponse = await axios.get('https://api.linkedin.com/v2/userinfo', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
    } catch (err) {
      errorLogger('Error fetching user profile from LinkedIn', err);
      const response = failureResponse({
        handler: 'auth',
        messageCode: 'E040',
        req,
      });
      return res.status(response?.statusCode).send(response);
    }

    const { email, name, given_name, family_name } = profileResponse.data;

    if (!email) {
      const response = failureResponse({
        handler: 'auth',
        messageCode: 'E041', 
        req,
      });
      return res.status(response?.statusCode).send(response);
    }

    // Step 3: Check if the user exists
    let user;
    try {
      user = await mongooseService.findOne(UserModel, {email})
      if (!user) {
        // Create a new user if not found
        user = await mongooseService.save(UserModel, {
          email,
          name: name || `${given_name} ${family_name}`,
          type: 'candidate',
        });
      }
    } catch (err) {
      errorLogger('Error checking or saving user to database', err);
      const response = failureResponse({
        handler: 'auth',
        messageCode: 'E011',
        req,
      });
      return res.status(response?.statusCode).send(response);
    }

    // Step 4: Generate JWT token
    let jwtToken;
    try {
      jwtToken = jwt.sign(
        {
          id: user._id,
          email: user.email,
          name: user.name,
          type: user.type,
        },
        process.env.JWT_ACCESS_SECRET as string,
        {
          expiresIn: '1d',
        }
      );
    } catch (err) {
      errorLogger('Error generating JWT token', err);
      const response = failureResponse({
        handler: 'auth',
        messageCode: 'E036',
        req,
      });
      return res.status(response?.statusCode).send(response);
    }

    const response = successResponse({
      handler: 'auth',
      messageCode: 'S003',
      req,
      data: {
        accessToken: jwtToken,
        userData: user,
      },
    });
    return res.status(response?.statusCode).send(response);
  } catch (error) {
    errorLogger('Unhandled Error in handleLinkedinSignup function', error);
    const response = catchResponse({
      handler: 'auth',
      messageCode: 'E036',
      req,
      error,
    });
    return res.status(response?.statusCode).send(response);
  }
};


export const handleLinkedinLogin = async (req: any, res: any) => {
  try {
    infoLogger('START: handleLinkedinLogin function');
    dataLogger('req.body', req.body);

    const { code } = req.body;

    if (!code) {
      const response = failureResponse({
        handler: 'auth',
        messageCode: 'E037',
        req,
      });
      return res.status(response?.statusCode).send(response);
    }

    // Step 1: Exchange authorization code for access token
    let tokenResponse;
    try {
      tokenResponse = await axios.post(
        'https://www.linkedin.com/oauth/v2/accessToken',
        null,
        {
          params: {
            grant_type: 'authorization_code',
            code,
            redirect_uri: LINKEDIN_REDIRECT_URI,
            client_id: LINKEDIN_CLIENT_ID,
            client_secret: LINKEDIN_CLIENT_SECRET,
          },
        }
      );
    } catch (err) {
      errorLogger('Error fetching access token', err);
      const response = failureResponse({
        handler: 'auth',
        messageCode: 'E037', 
        req,
      });
      return res.status(response?.statusCode).send(response);
    }

    const { access_token } = tokenResponse.data;

    if (!access_token) {
      const response = failureResponse({
        handler: 'auth',
        messageCode: 'E039', 
        req,
      });
      return res.status(response?.statusCode).send(response);
    }

    // Step 2: Fetch user profile and email from LinkedIn's userinfo endpoint
    let profileResponse;
    try {
      profileResponse = await axios.get('https://api.linkedin.com/v2/userinfo', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
    } catch (err) {
      errorLogger('Error fetching user profile from LinkedIn', err);
      const response = failureResponse({
        handler: 'auth',
        messageCode: 'E040',
        req,
      });
      return res.status(response?.statusCode).send(response);
    }

    const { email } = profileResponse.data;

    if (!email) {
      const response = failureResponse({
        handler: 'auth',
        messageCode: 'E041',
        req,
      });
      return res.status(response?.statusCode).send(response);
    }

    // Step 3: Check if the user exists
    let user;
    try {
      user = await mongooseService.findOne(UserModel, { email });
      if (!user) {
        const response = failureResponse({
          handler: 'auth',
          messageCode: 'E008',
          req,
        });
        return res.status(response?.statusCode).send(response);
      }
    } catch (err) {
      errorLogger('Error checking user in database', err);
      const response = failureResponse({
        handler: 'auth',
        messageCode: 'E036',
        req,
      });
      return res.status(response?.statusCode).send(response);
    }

    // Step 4: Generate JWT token
    let jwtToken;
    try {
      jwtToken = jwt.sign(
        {
          id: user._id,
          email: user.email,
          name: user.name,
          type: user.type,
        },
        process.env.JWT_ACCESS_SECRET as string,
        {
          expiresIn: '1d',
        }
      );
    } catch (err) {
      errorLogger('Error generating JWT token', err);
      const response = failureResponse({
        handler: 'auth',
        messageCode: 'E036',
        req,
      });
      return res.status(response?.statusCode).send(response);
    }

    const response = successResponse({
      handler: 'auth',
      messageCode: 'S005',
      req,
      data: {
        accessToken: jwtToken,
        userData: user,
      },
    });
    return res.status(response?.statusCode).send(response);
  } catch (error) {
    errorLogger('Unhandled Error in handleLinkedinLogin function', error);
    const response = catchResponse({
      handler: 'auth',
      messageCode: 'E036', 
      req,
      error,
    });
    return res.status(response?.statusCode).send(response);
  }
};
