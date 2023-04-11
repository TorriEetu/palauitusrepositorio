import express from "express";
import { Diagnose } from "../types/diagnose";
import diagnoseData from "../data/diagnoses";

const diagnoseRouter = express.Router();

export const getDiagnoses = (): Array<Diagnose> => {
  return diagnoseData;
};

diagnoseRouter.get('/' , async (_request:any, response:any) => {
    response.send(getDiagnoses());
}) 

export default diagnoseRouter;