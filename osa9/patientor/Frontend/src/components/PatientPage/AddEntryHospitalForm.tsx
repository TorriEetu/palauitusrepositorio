import { useState, SyntheticEvent } from 'react';
import { TextField, Grid, Button } from '@mui/material';
import { EntryFormValues } from '../../types';

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

const AddEntryHospitalForm = ({ onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState('');

  const addPatient = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      description,
      date,
      specialist,
      diagnosisCodes: diagnosisCodes.split(','),
      discharge: {
        date: dischargeDate,
        criteria: dischargeCriteria,
      },
      type: 'Hospital',
    });
  };

  return (
    <div>
      <form onSubmit={addPatient}>
        <TextField
          label='Description'
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label='Date'
          placeholder='YYYY-MM-DD'
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label='Specialist'
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          label='Discharge Date'
          fullWidth
          value={dischargeDate}
          onChange={({ target }) => setDischargeDate(target.value)}
        />
        <TextField
          label='Discharge Criteria'
          fullWidth
          value={dischargeCriteria}
          onChange={({ target }) => setDischargeCriteria(target.value)}
        />
        <TextField
          label='Diagnosis codes'
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value)}
        />
        <Grid>
          <Grid item>
            <Button
              color='secondary'
              variant='contained'
              style={{ float: 'left' }}
              type='button'
              onClick={onCancel}>
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: 'right',
              }}
              type='submit'
              variant='contained'>
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryHospitalForm;
