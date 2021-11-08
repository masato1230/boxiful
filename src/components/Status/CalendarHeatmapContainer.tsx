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
  const [trainingResults, postTrainingResult] = useTrainingResult();

  // Return 365 days before
  const calculateStartDate = () => {
    const startDate = new Date();
    startDate.setDate(startDate.getDay() - 365);
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
    <div className="px-10">
      <div className="mt-5 pt-4 pl-10 pr-10 shadow-lg rounded">
        <div className="my-3">
          <div>
            <BsFillCalendar2CheckFill className="inline-block h-6 align-middle text-green-600" />
            <p className="ml-3 inline-block h-6 align-middle">
              これまでのトレーニング回数 {trainingResults.length} 回
            </p>
          </div>
          <div>
            <SiWebmoney className="inline-block h-6 align-middle text-yellow-500" />
            <p className="ml-3 inline-block h-6 align-middle">
              累計ボクシフルポイント　
              {trainingResults &&
                trainingResults.length > 0 &&
                trainingResults
                  .map((trainingResult) => trainingResult.point)
                  .reduce((acc, current) => acc + current)}
              ポイント
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
    </div>
  );
};

export default CalendarHeatmapContainer;
