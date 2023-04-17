import { useEffect, useState } from 'react';
import patientService from '../../services/patients';
import { Patient, Gender, Diagnosis } from '../../types';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { Transgender, Female, Male } from '@mui/icons-material/';
import EntryDetails from './EntryDetails';

interface DiagnoseProps {
  diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: DiagnoseProps) => {
  const [patient, setPatient] = useState<Patient>();
  const { id } = useParams<{ id?: string }>();

  useEffect(() => {
    const fetchPatientList = async () => {
      const patient = await patientService.getById(id);
      setPatient(patient);
    };
    void fetchPatientList();
  }, [id]);

  if (patient === undefined) {
    return <></>;
  }

  const getPatientGenderIcon = (gender: Gender) => {
    if (gender === Gender.Male) return <Male />;
    if (gender === Gender.Female) return <Female />;
    return <Transgender />;
  };

  return (
    <Box>
      <Typography variant='h5'>
        {patient.name} {getPatientGenderIcon(patient.gender)}
      </Typography>
      <div>ssh: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      <Typography variant='h6'>entries</Typography>
      {patient.entries.map((p) => (
        <EntryDetails key={p.id} entry={p}></EntryDetails>
      ))}
    </Box>
  );
};

export default PatientPage;