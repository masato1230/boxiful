import { NormalizedLandmarkList, POSE_LANDMARKS } from '@mediapipe/pose';
import { useEffect, useState } from 'react';
import { calculateLandmarkAngleXY_YZ_ZX } from '../../utils/angles/landmarkAngle';
import Information from './Information';
import {
  Instruction,
  LeftHandLeftPunch,
  LeftHandRightPunch,
  LeftJabInstruction,
  LeftLegLeftKick,
  LeftLegRightKick,
  RightHandLeftPunch,
  RightHandRightPunch,
  RightLegLeftKick,
  RightLegRightKick,
} from './Instructions';
import PoseEstimation from './PoseEstimation';
import sound from '../../sounds/good-punch.mp3';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const Training = () => {
  // get actionCreators and redux state
  const { setMenu, setInstructions, pushScore } = useActions();
  const { menu, instructions, scores } = useTypedSelector((state) => {
    return {
      menu: state.training.menu,
      instructions: state.training.instructions,
      scores: state.training.scores,
    };
  });

  const [poseLandmarks, setPoseLandmarks] = useState<NormalizedLandmarkList>();
  const [leftArmAngle, setLeftArmAngle] = useState(0);
  const [rightArmAngle, setRightArmAngle] = useState(0);
  const [isMoveStarted, setIsMoveStarted] = useState(false);
  const [isMoveEnded, setIsMoveEnded] = useState(false);

  // good punch sound
  const audio = new Audio(sound);

  // set menu
  useEffect(() => {
    setMenu({
      title: 'Test Menu',
      timeLimit: 100000,
      numOfInstructions: 10,
    });
  }, []);

  // set instructions
  useEffect(() => {
    const newInstructions: Instruction[] = [];
    for (let i = 0; i < menu.numOfInstructions; i++) {
      if (i % 2 === 0) {
        newInstructions.push(RightHandLeftPunch);
      } else {
        newInstructions.push(LeftHandLeftPunch)
      }
    }
    setInstructions(newInstructions);
  }, [menu]);

  // manage instruction states
  useEffect(() => {
    if (poseLandmarks && instructions.length !== 0) {
      // when move is not yet started
      if (!isMoveStarted) {
        if (instructions[scores.length].detectStartFunction(poseLandmarks)) {
          setIsMoveStarted(true);
        }
        return;
      }
      // when move is already started
      if (!isMoveEnded) {
        if (instructions[scores.length].detectEndFunction(poseLandmarks)) {
          setIsMoveEnded(true);
          pushScore(1);
          audio.play();
        }
      }
    }
  }, [poseLandmarks]);

  // reset instruction state
  useEffect(() => {
    if (isMoveEnded) {
      setIsMoveStarted(false);
      setIsMoveEnded(false);
    }
  }, [isMoveEnded]);

  // update angles(not needed)
  useEffect(() => {
    if (poseLandmarks) {
      setLeftArmAngle(
        calculateLandmarkAngleXY_YZ_ZX(
          POSE_LANDMARKS.LEFT_WRIST,
          POSE_LANDMARKS.LEFT_ELBOW,
          POSE_LANDMARKS.LEFT_SHOULDER,
          poseLandmarks
        ).angleXY
      );
      setRightArmAngle(
        calculateLandmarkAngleXY_YZ_ZX(
          POSE_LANDMARKS.RIGHT_WRIST,
          POSE_LANDMARKS.RIGHT_ELBOW,
          POSE_LANDMARKS.RIGHT_SHOULDER,
          poseLandmarks
        ).angleXY
      );
    }
  }, [poseLandmarks]);

  return (
    <div className="mx-auto flex h-screen py-1">
      <div className="bg-yellow-500 w-1/2 mx-1 rounded-xl">
        {instructions[scores.length] !== undefined &&
          <Information
            instruction={instructions[scores.length]}
            isMoveStarted={isMoveStarted}
            isMoveEnded={isMoveEnded}
            leftArmAngel={leftArmAngle}
            rightArmAngle={rightArmAngle}
          />
        }
      </div>
      <div className="w-1/2 mx-1 rounded-xl">
        <PoseEstimation setPoseLandmarks={setPoseLandmarks} />
      </div>
    </div>
  );
};

export default Training;
