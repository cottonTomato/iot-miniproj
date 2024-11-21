import { onRequest } from 'firebase-functions/v2/https';
import { defineSecret, defineString } from 'firebase-functions/params';
import * as logger from 'firebase-functions/logger';
import jwt from 'jsonwebtoken';
import StatusCodes from 'http-status-codes';
import { z } from 'zod';
import { user } from 'models';

export const loginRequestSchema = z.object({
  empId: z.string().length(10),
  password: z.string().min(8).max(12),
});

interface UserSessionData {
  empId: string;
  admin: boolean;
}

const jwtSecret = defineSecret('AUTH_TOKEN_SECRET');
const jwtLifetime = defineString('AUTH_TOKEN_LIFETIME');

const loginHandler = onRequest({}, (req, res) => {
  try {
    const validatedBody = loginRequestSchema.parse(req.body);
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(StatusCodes.BAD_REQUEST).send({
        message: `Validation Error: ${err.message}`,
      });
    }
  }
});

export default loginHandler;
