export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export type patientWithoutSsn = Omit<Patient, 'ssn'>;
export type NewPatient = Omit<Patient, 'id'>;
