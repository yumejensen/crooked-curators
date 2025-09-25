import { Router } from 'express';
import { generateUploadURL } from '../s3'

const s3UrlRouter = Router();

s3UrlRouter.get("/", async (req, res) => {
  const url = await generateUploadURL();
  res.send(url);
})

export { s3UrlRouter };
