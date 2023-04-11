import express from "express";
import { NewPatient} from "../types/patient";
import { getPatientsWihoutSsn , addPatient } from "../services/patientServices";


const patientRouter = express.Router();


patientRouter.get('/' , async (_request:any, response:any) => {
  response.send(getPatientsWihoutSsn());
}) 

patientRouter.post('/' , async (request:any, response:any) => {
  try {
      const newPatient =  request.body as NewPatient;
      const addedPatient = addPatient(newPatient);
      return response.status(201).json(addedPatient);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return response.status(400).json({ error: error.message });
      } else {
        return response.status(500).json({ error: 'server could not process the request' });
      }
    }
  }
) 

export default patientRouter;