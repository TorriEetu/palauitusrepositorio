import express from 'express';
import { NewPatient } from '../types/patient';
import { getPatientsWihoutSsn, addPatient, getPatientsWithId } from '../services/patientServices';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
  res.send(getPatientsWihoutSsn());
});

patientRouter.get('/:id', (req, res) => {
  const patient = getPatientsWithId(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

patientRouter.post('/', (req, res) => {
  try {
    const newPatient = req.body as NewPatient;
    const addedPatient = addPatient(newPatient);
    return res.status(201).json(addedPatient);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    } else {
      return res.status(500).json({ error: 'server could not process the request' });
    }
  }
});

export default patientRouter;
