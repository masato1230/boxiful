import { useEffect, useState } from 'react';
import { useTrainingResult } from '../../hooks/useTrainingResults';
import { TrainingResult } from '../../models/TrainingResult';
import CalendarHeatmap from 'react-calendar-heatmap';
import { BsFillCalendar2CheckFill } from 'react-icons/bs';
import { SiWebmoney } from 'react-icons/si';
import 'react-calendar-heatmap/dist/styles.css';
import './CalendarHeatmapContainer.css';

interface CalendarHeatmapValue {
  date: Date;
  trainingResults: TrainingResult[];
}

const CalendarHeatmapContainer = () => {
  const [values, setValues] = useState<CalendarHeatmapValue[]>([]);
  const { trainingResults } = useTrainingResult();

  // Return 365 days before if user uses pc or tablet, else return 90days
  const calculateStartDate = () => {
    const startDate = new Date();
    const dateLength = window.innerWidth > 768 ? 365 : 90;
    startDate.setDate(startDate.getDay() - dateLength);
    return startDate;
  };

  const determineIsSameDateWithoutTime = (date1: Date, date2: Date) => {
    // create copy of dates
    // compare date by getTime()
    date1.setHours(0, 0, 0, 0);
    date2.setHours(0, 0, 0, 0);
    return date1.getTime() === date2.getTime();
  };

  // calculate color from CalendarHeatmapValue
  const valueToColorClass = (value: CalendarHeatmapValue) => {
    if (!value) return 'color-empty';
    // get sum of points
    let sumOfPoints = 0;
    for (const trainingResult of value.trainingResults) {
      sumOfPoints += trainingResult.point;
    }

    if (sumOfPoints === 0) {
      return 'color-empty';
    }
    // ceil sum of points by max value (2000)
    if (sumOfPoints > 2000) {
      sumOfPoints = 2000;
    }
    return `color-${Math.round(sumOfPoints / 200)}`;
  };

  // set tooltips
  const setTooltipDataAttrs = (value: CalendarHeatmapValue) => {
    if (!value || !value.date) return { 'data-tip': '' };

    let sumOfCalorie = 0;
    let sumOfPoints = 0;

    if (value.trainingResults) {
      for (const trainingResult of value.trainingResults) {
        sumOfCalorie += trainingResult.calorie;
        sumOfPoints += trainingResult.point;
      }
    }
    return {
      'data-tip': `
      消費カロリーは${sumOfCalorie}kcal、
      ポイントは${sumOfPoints}ポイント、
      ${value.date.toISOString().slice(0, 10)}
      `,
    };
  };

  useEffect(() => {
    if (trainingResults.length === 0) return;

    // set values from startDate to today
    const newValues = [];
    const startDate = calculateStartDate();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    for (
      let totallingDate = startDate;
      !determineIsSameDateWithoutTime(totallingDate, tomorrow);
      totallingDate.setDate(totallingDate.getDate() + 1)
    ) {
      const value: CalendarHeatmapValue = {
        date: new Date(totallingDate.getTime()),
        trainingResults: trainingResults.filter((trainingResult) => {
          return determineIsSameDateWithoutTime(
            totallingDate,
            new Date(trainingResult.created_at!)
          );
        }),
      };
      newValues.push(value);
    }
    setValues(newValues);
  }, [trainingResults]);

  return (
    <div className="mt-5 pt-4 px-5 md:px-10 shadow-lg rounded">
      <div className="my-3">
        <div>
          <p className="text-xs md:text-base inline-block h-6 align-middle font-bold mb-2">
            <BsFillCalendar2CheckFill className="text-xl mr-3 inline-block h-6 align-middle text-green-600" />
            <span className="hidden md:inline-block">これまでの</span>
            トレーニング回数
            <span className="ml-5">{trainingResults.length} 回</span>
          </p>
        </div>
        <div>
          <p className="text-xs md:text-base inline-block h-6 align-middle font-bold">
            <SiWebmoney className="text-xl mr-3 inline-block h-6 align-middle text-yellow-500" />
            累計<span className="hidden md:inline-block">ボクシフル</span>
            ポイント　
            <span className="ml-5">
              {trainingResults &&
                trainingResults.length > 0 &&
                trainingResults
                  .map((trainingResult) => trainingResult.point)
                  .reduce((acc, current) => acc + current)}{' '}
              ポイント
            </span>
          </p>
        </div>
      </div>
      <CalendarHeatmap
        startDate={calculateStartDate()}
        endDate={new Date()}
        values={values}
        classForValue={valueToColorClass}
        tooltipDataAttrs={setTooltipDataAttrs}
        showMonthLabels={true}
        showWeekdayLabels={true}
      />
    </div>
  );
};

export default CalendarHeatmapContainer;
