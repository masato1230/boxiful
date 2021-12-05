import Menu from '../menu';

export default interface Interval {
  durationMinutes: number;
  durationSeconds: number;
}

export const fifteenSecondsInterval: Interval = {
  durationMinutes: 0,
  durationSeconds: 15,
}

export const thirtySecondsInterval: Interval = {
  durationMinutes: 0,
  durationSeconds: 30,
}

export const fortyFiveSecondsInterval: Interval = {
  durationMinutes: 0,
  durationSeconds: 45,
}

export const oneMinuteInterval: Interval = {
  durationMinutes: 1,
  durationSeconds: 0,
}