import React from 'react';
import { privaciesData } from '../../models/privacies';

const Privacy = () => {
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold">プライバシーポリシー</h1>
      <hr className="border-4 border-yellow-500 my-3" />
      {privaciesData.map((privacySet, index) => {
        return (
          <div className="my-12" key={privacySet.title}>
            <h2 className="text-xl font-semibold mb-3">{`第${index + 1}条 ${
              privacySet.title
            }`}</h2>
            <div className="text-sm">{privacySet.content}</div>
          </div>
        );
      })}
    </main>
  );
};

export default Privacy;
