import { NormalizedLandmarkList } from '@mediapipe/pose';
import React, { useEffect, useState } from 'react';
import { judgeFromScore } from '../../utils/scores';
import Information from './Information';
import PoseEstimation from './PoseEstimation';
import goodSound from '../../sounds/good-punch.mp3';
import greatSound from '../../sounds/great-punch.mp3';
import missSound from '../../sounds/miss-punch.mp3';
import finishSound from '../../sounds/finish.mp3';
import bgmSound from '../../sounds/training-bgm-neffex-failure.mp3';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useHistory } from 'react-router';
import { calculateNormalMenuMoveScore } from '../../utils/scores';
import FinishModal from './FinishModal';
import { useTrainingResult } from '../../hooks/useTrainingResults';
import {
  calculateTotalCalorieFromInstructions,
  calculateResultScore,
} from '../../utils/scores';
import { useIsLoggedIn } from '../../hooks/useIsLoggedIn';
import WarningModal from './WarningModal';

const Training = () => {
  // Redux - get actionCreators adn states
  const { pushScore } = useActions();
  const { menu, instructions, scores } = useTypedSelector((state) => {
    return {
      menu: state.training.menu,
      instructions: state.training.instructions,
      scores: state.training.scores,
    };
  });

  const history = useHistory();

  // useState
  const [poseLandmarks, setPoseLandmarks] = useState<NormalizedLandmarkList>();
  const [moveStartTime, setMoveStartTime] = useState<Date>();
  const [isMoveStarted, setIsMoveStarted] = useState(false);
  const [isMoveEnded, setIsMoveEnded] = useState(false);
  const [moveJudge, setMoveJudge] = useState<'Great' | 'Good' | 'Slow' | null>(
    null
  );
  const [isShowFinishModal, setIsShowFinishModal] = useState(false);
  // device check result modal
  const [isShowNotWorkOsModal, setIsShowNotWorkOsModal] = useState(false);
  const [isShowTooSmallModal, setIsShowTooSmallModal] = useState(false);

  // Hooks
  const { isLoggedIn } = useIsLoggedIn();
  const { postTrainingResult } = useTrainingResult();

  // sounds
  const goodAudio = new Audio(goodSound);
  const greatAudio = new Audio(greatSound);
  const missAudio = new Audio(missSound);
  const finishAudio = new Audio(finishSound);
  const bgmAudio = new Audio(bgmSound);
  bgmAudio.volume = 0.1;

  // set up
  useEffect(() => {
    // redirect if scores are full
    if (scores.length === instructions.length) {
      history.push('/result');
    }
    // device check
    const userAgent = navigator.userAgent;
    if (userAgent.includes('iPhone')) {
      setIsShowNotWorkOsModal(true);
    } else if (userAgent.includes('iPad')) {
      setIsShowNotWorkOsModal(true);
    }

    if (window.innerWidth < 500) {
      setIsShowTooSmallModal(true);
    }

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
    if (poseLandmarks && instructions.length !== 0) {
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
          pushScore(score);
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
    if (instructions.length === scores.length) {
      setTimeout(() => {
        history.push('/training_to_result');
      }, 2000);
      // play finish sound
      setTimeout(() => {
        // show finish modal
        setIsShowFinishModal(true);
        bgmAudio.pause();
        finishAudio.play();
      }, 500);
      // post result to api if user is logged in
      if (isLoggedIn) {
        postTrainingResult({
          menu: menu.title,
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

  return (
    <React.Fragment>
      {isShowFinishModal && <FinishModal />}
      {isShowNotWorkOsModal && (
        <WarningModal
          setIsShowWarningModal={setIsShowNotWorkOsModal}
          message="?????????????????????????????????????????????(ios)???AI?????????????????????????????????????????????????????????????????????????????????PC???????????????????????????????????????"
          colorClass="red-500"
        />
      )}
      {isShowTooSmallModal && (
        <WarningModal
          setIsShowWarningModal={setIsShowTooSmallModal}
          message="????????????????????????????????????????????????????????????????????????????????????????????????????????????PC??????????????????????????????????????????"
          colorClass="yellow-500"
        />
      )}
      <div className="mx-auto flex h-screen my-5 px-4 relative">
        <div className="bg-white inset-0 md:w-1/2 mx-2 h-5/6 absolute md:relative z-10 bg-transparent bg-opacity-0 text-white md:text-black">
          {instructions[scores.length] !== undefined && (
            <Information
              moveJudge={moveJudge}
              isMoveStarted={isMoveStarted}
              isMoveEnded={isMoveEnded}
            />
          )}
        </div>
        <div className="w-full md:w-1/2 mx-2 rounded-xl h-5/6">
          <PoseEstimation setPoseLandmarks={setPoseLandmarks} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Training;
