import { title } from 'process';
import React from 'react';
import { Helmet } from 'react-helmet';

interface CustomHeadProps {
  title: string;
  description?: string;
}

const Head: React.FC<CustomHeadProps> = ({ title, description }) => {
  return (
    <Helmet>
      <title>{title}</title>
      {typeof description !== undefined && (
        <meta name="description" content={description} />
      )}
    </Helmet>
  );
};

export default Head;
