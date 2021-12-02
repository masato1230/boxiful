import Menu from './menu';
import { Instruction } from '../../components/Training/Instructions';
import Interval from './Interval';

export default interface MenuSeries {
  title: String;
  description: String;
  durationInMinutes: number;
  approximateCalorieConsumption: number;
  menus: [Instruction | Interval];
}