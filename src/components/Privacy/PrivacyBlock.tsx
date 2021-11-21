import React from "react";
import { PrivacySet } from "../../models/privacies";

const PrivacyBlock: React.FC<PrivacySet> = ({ title, content }) => {
  return <div>
    <h2>{title}</h2>
    <div>
      {content}
    </div>
  </div>;
};

export default PrivacyBlock;
