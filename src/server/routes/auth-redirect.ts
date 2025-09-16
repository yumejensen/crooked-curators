import passport from 'passport';
import { Router, Request } from 'express';


const authRouter = Router();

authRouter.get('/',
  passport.authenticate('google', { scope: ['email', 'profile'] }),
  (req, res)=>{
    console.log('user attempting login', req.body.user);
  }
);

authRouter.get('/callback',
  passport.authenticate('google', {
    failureRedirect: '/'
  }),
  (req, res) => {
    res.redirect('http://localhost:3000/')
  }

)

export { authRouter };