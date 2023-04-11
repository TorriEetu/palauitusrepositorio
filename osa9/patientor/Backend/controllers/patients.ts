import express from "express";
import { Patient, patientWithoutSsn } from "../types/patient";
import patientsData from "../data/patients";

const patientRouter = express.Router();

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
        })
    );
};

patientRouter.get('/' , async (_request:any, response:any) => {
    response.send(getPatientsWihoutSsn());
}) 

export default patientRouter;