import { Fragment } from "react";
import SlideBackground from './backgrounds/SlideBackground';

const AboutJudge = () => {
  return (
    <Fragment>
      <div className="container mx-auto px-5 md:px-10 min-h-screen">
        <h1 className="mt-5 mb-2 ml-5 text-3xl font-bold text-yellow-500">
          About Judge
        </h1>
      </div>
      <SlideBackground />
    </Fragment>
  )
}

export default AboutJudge;