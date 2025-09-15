import passport from 'passport';
import { Router } from 'express';


const authRouter = Router();

authRouter.get('auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

authRouter.get('auth/google/callback',
  passport.authenticate('google', {
    // failed sign in
  })

)

export { authRouter };