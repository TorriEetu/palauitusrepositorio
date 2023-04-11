import express from "express";
import { getDiagnoses } from "../services/diagnoseServices";


const diagnoseRouter = express.Router();


diagnoseRouter.get('/' , async (_request:any, response:any) => {
    response.send(getDiagnoses());
}) 

export default diagnoseRouter;