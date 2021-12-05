import React, { useEffect, useRef, useState } from 'react';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import Menu from '../../../models/menu';
import goodSound from '../../../sounds/good-punch.mp3';
import greatSound from '../../../sounds/great-punch.mp3';
import missSound from '../../../sounds/miss-punch.mp3';
import finishSound from '../../../sounds/finish.mp3';
import bgmSound from '../../../sounds/training-bgm-neffex-failure.mp3';
import { createInstructionsFromMenu } from '../../../state';
import { NormalizedLandmarkList } from '@mediapipe/pose';
import { calculateNormalMenuMoveScore, calculateResultScore, calculateTotalCalorieFromInstructions, judgeFromScore } from '../../../utils/scores';
import { useIsLoggedIn } from '../../../hooks/useIsLoggedIn';
import { useTrainingResult } from '../../../hooks/useTrainingResults';
import { determineInstructionColor } from '../../../utils/training';

interface TrainingInformationProps {
  poseLandmarks: NormalizedLandmarkList | undefined;
}

const TrainingInformation: React.FC<TrainingInformationProps> = ({ poseLandmarks }) => {
  // Redux - get actionCreators adn states
  const { setMenu, setInstructions, pushScore, pushSeriesScore, resetScores, setMenuIndex } = useActions();
  const { seriesMenu, menuIndex, seriesTrainingScores, instructions, scores } = useTypedSelector(
    (state) => {
      return {
        seriesMenu: state.seriesTraining.seriesMenu,
        menuIndex: state.seriesTraining.menuIndex,
        seriesTrainingScores: state.seriesTraining.seriesTrainingScores,
        instructions: state.training.instructions,
        scores: state.training.scores,
      };
    }
  );
  const instruction = instructions[scores.length];

  // Own States
  const [moveStartTime, setMoveStartTime] = useState<Date>();
  const [isMoveStarted, setIsMoveStarted] = useState(false);
  const [isMoveEnded, setIsMoveEnded] = useState(false);
  const [moveJudge, setMoveJudge] = useState<'Great' | 'Good' | 'Slow' | null>(
    null
  );

  // hooks
  const {isLoggedIn, logout} = useIsLoggedIn();
  const { postTrainingResult } = useTrainingResult();

  // sounds
  const goodAudio = new Audio(goodSound);
  const greatAudio = new Audio(greatSound);
  const missAudio = new Audio(missSound);
  const finishAudio = new Audio(finishSound);
  const bgmAudio = new Audio(bgmSound);
  bgmAudio.volume = 0.1;

  // bgm set up
  useEffect(() => {
    // bgm management
    if (typeof bgmAudio.loop == 'boolean') {
      bgmAudio.loop = true;
    } else {
      bgmAudio.addEventListener(
        'ended',
        function () {
          this.currentTime = 0;
          this.play();
        },
        false
      );
    }
    bgmAudio.play();

    return () => bgmAudio.pause();
  }, []);

  // manage instruction states
  useEffect(() => {
    if (poseLandmarks !== undefined && instructions.length !== 0) {
      if (!moveStartTime) {
        // set first movement start time
        setMoveStartTime(new Date());
      }
      // when move is not yet started
      if (!isMoveStarted) {
        if (instructions[scores.length].detectStartFunction(poseLandmarks)) {
          setIsMoveStarted(true);
        }
        return;
      }
      // when move is already started
      if (!isMoveEnded) {
        if (
          instructions[scores.length].detectEndFunction(poseLandmarks) &&
          moveStartTime
        ) {
          setIsMoveEnded(true);
          const now = new Date();
          const score = calculateNormalMenuMoveScore(
            (now.getTime() - moveStartTime.getTime()) / 1000
          );
          setMoveStartTime(now);
          // update scores
          pushScore(score);
          pushSeriesScore(score);
          // updateJudge
          const newMoveJudge = judgeFromScore(score);
          setMoveJudge(newMoveJudge);
          if (newMoveJudge === 'Good') {
            goodAudio.play();
          } else if (newMoveJudge === 'Great') {
            greatAudio.play();
          } else {
            missAudio.play();
          }
        }
      }
    }
  }, [poseLandmarks]);

  // reset instruction state
  useEffect(() => {
    // when menu finished
    if (instructions.length === scores.length && instructions.length > 0) {
      // play finish sound
      setMenuIndex(menuIndex + 1);
      setTimeout(() => {
        finishAudio.play();
      }, 500);
      // post result to api if user is logged in
      if (isLoggedIn) {
        postTrainingResult({
          menu: (seriesMenu.menus[menuIndex] as Menu).title,
          calorie: calculateTotalCalorieFromInstructions(instructions),
          point: Math.round(scores.reduce((acc, cur) => acc + cur, 0) / 10),
          score: calculateResultScore(scores),
        });
      }
      return;
    }

    // Reset the movement
    if (isMoveEnded) {
      setIsMoveStarted(false);
      setIsMoveEnded(false);
    }
  }, [isMoveEnded]);

  // refs
  const judgeRef = useRef<HTMLParagraphElement | null>(null);

  // update judge
  useEffect(() => {
    // update judge
    if (!judgeRef.current) return;
    judgeRef.current.style.display = 'inline-block';
    if (moveJudge === 'Good') {
      judgeRef.current.style.backgroundColor = 'blue';
    } else if (moveJudge === 'Great') {
      judgeRef.current.style.backgroundColor = 'red';
    } else {
      judgeRef.current.style.backgroundColor = 'gray';
    }
    judgeRef.current.textContent = moveJudge;
  });

  // TODO: set test data
  useEffect(() => {
    setMenu(seriesMenu.menus[menuIndex] as Menu);
    setInstructions(
      createInstructionsFromMenu(seriesMenu.menus[menuIndex] as Menu)
    );
  }, []);

  // TODO: modify loading ui
  if (instruction === undefined) {
    return <div>loading</div>;
  }

  return (
    <div className="h-full">
      <h2 className="pt-5 text-3xl md:text-5xl text-white md:text-black text-center font-bold px-5 h-1/6">
        {instruction.title}
      </h2>
      <div className="h-1/6 md:hidden"></div>
      <div className="align-middle mx-auto w-min h-2/6 pt-5">
        <instruction.icon
          color={determineInstructionColor(instruction)}
          size="250"
          key={scores.length}
          className="instruction-icon w-40 h-40 md:w-auto md:w-auto bg-white rounded-full"
        />
      </div>
      <div className="h-1/6 px-5">
        <div className="">
          <p
            ref={judgeRef}
            className="inline-block text-white rounded-full text-3xl md:text-5xl p-3 md:p-8"
          ></p>
          <p className="float-right inline-block text-right text-3xl md:text-5xl">
            {`${scores.length} / ${instructions.length}`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrainingInformation;
