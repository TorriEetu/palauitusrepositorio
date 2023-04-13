import { Patient, patientWithoutSsn, NewPatient } from '../types/patient';
import patientsData from '../data/patients';
import { v1 as uuid } from 'uuid';

export const getPatients = (): Array<Patient> => {
  return patientsData;
};

export const getPatientsWihoutSsn = (): Array<patientWithoutSsn> => {
  return patientsData.map((patient) => ({
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation,
  }));
};

export const addPatient = (patient: NewPatient): Patient => {
  const id = uuid();
  const newPatient = { id, ...patient };
  patientsData.push(newPatient);
  return newPatient;
};
