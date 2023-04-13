import express from 'express';
import { getDiagnoses } from '../services/diagnoseServices';

const diagnoseRouter = express.Router();

diagnoseRouter.get('/', (_request, response) => {
  response.send(getDiagnoses());
});

export default diagnoseRouter;
