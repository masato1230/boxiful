import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';

const Instruction: React.FC = () => {
  return (
    <div>
      <h2 className="text-4xl">Left Jab</h2>
      <BsArrowLeftCircleFill color="white" size="200" />
      <BsArrowRightCircleFill color="white" size="200" />
    </div>
  );
};

export default Instruction;
