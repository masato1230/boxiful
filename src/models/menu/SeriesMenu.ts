import Menu from './menu';
import Interval from './Interval';

export default interface SeriesMenu {
  title: String;
  description: String;
  durationInMinutes: number;
  approximateCalorieConsumption: number;
  menus: [Menu | Interval];
}