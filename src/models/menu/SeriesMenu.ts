import Menu, { EasyMenu } from '../menu';
import Interval, { thirtySecondsInterval } from './Interval';

export default interface SeriesMenu {
  title: String;
  description: String;
  durationInMinutes: number;
  approximateCalorieConsumption: number;
  menus: (Menu | Interval)[];
}

export const testSeriesMenu: SeriesMenu = {
  title: 'テスト用シリーズメニュー',
  description: 'テストテスト',
  durationInMinutes: 1,
  approximateCalorieConsumption: 9,
  menus: [EasyMenu, thirtySecondsInterval, EasyMenu]
}
