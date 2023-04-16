import Title from './title';
import { Visibility, Weather } from '../types';
import { SyntheticEvent, useState } from 'react';
import { create } from '../services/diaries';

interface WeatherOption {
  value: Weather;
  label: string;
}

const weatherOption: WeatherOption[] = Object.values(Weather).map((v) => ({
  value: v,
  label: v.toString(),
}));

interface VisibilityOption {
  value: Visibility;
  label: string;
}

const visibilityOption: VisibilityOption[] = Object.values(Visibility).map((v) => ({
  value: v,
  label: v.toString(),
}));

const DiaryForm = () => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState(Visibility.Ok);
  const [weather, setWeather] = useState(Weather.Cloudy);
  const [comment, setComment] = useState('');

  const onWeatherChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    event.preventDefault();
    if (typeof event.target.value === 'string') {
      const value = event.target.value;
      const weather = Object.values(Weather).find((w) => w.toString() === value);
      console.log(weather);
      if (weather) {
        setWeather(weather);
      }
    }
  };

  const onVisibilityChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    event.preventDefault();
    if (typeof event.target.value === 'string') {
      const value = event.target.value;
      const visibility = Object.values(Visibility).find((v) => v.toString() === value);
      console.log(visibility);
      if (visibility) {
        setVisibility(visibility);
      }
    }
  };

  const addDiary = (event: SyntheticEvent) => {
    event.preventDefault();
    create({ date, weather, visibility, comment });
  };

  return (
    <div>
      <Title title='Add new entry'></Title>
      <form onSubmit={addDiary}>
        <div>
          Date
          <input value={date} onChange={({ target }) => setDate(target.value)} />
        </div>
        <div>
          Weather
          <select value={weather} onChange={onWeatherChange}>
            {weatherOption.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          Visibility
          <select value={visibility} onChange={onVisibilityChange}>
            {visibilityOption.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          Comment
          <input value={comment} onChange={({ target }) => setComment(target.value)} />
        </div>
        <button type='submit'>Add</button>
      </form>
    </div>
  );
};

export default DiaryForm;
