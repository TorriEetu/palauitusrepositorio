import { Gender, NewPatient } from './types/patient';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isGender(gender: any): gender is Gender {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(gender);
}

function isString(str: unknown): str is string {
  return typeof str === 'string' || str instanceof String;
}

function isDate(date: string): boolean {
  return Boolean(Date.parse(date));
}

function parseName(name: unknown): string {
  if (!isString(name)) {
    throw new Error(`incorrect or missing name: '${name}'`);
  }
  return name;
}

function parseDateOfBirth(dateOfBirth: unknown): string {
  if (!isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error(`incorrect or missing date: '${dateOfBirth}'`);
  }
  return dateOfBirth;
}

function parseSSN(ssn: unknown): string {
  if (!isString(ssn)) {
    throw new Error(`incorrect or missing ssn: '${ssn}'`);
  }
  return ssn;
}

function parseGender(gender: unknown): Gender {
  if (!isGender(gender)) {
    throw new Error(`incorrect or missing gender: '${gender}'`);
  }
  return gender;
}

function parseOccupation(occupation: unknown): string {
  if (!occupation || !isString(occupation)) {
    throw new Error(`incorrect or missing occupation: '${occupation}'`);
  }
  return occupation;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewPatient = (object: any): NewPatient => {
  return {
    name: parseName(object.name),
    ssn: parseSSN(object.ssn),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
  };
};
