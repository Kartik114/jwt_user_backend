import React from 'react';
// import './styles/shared/general.css';
import './styles/shared/amazon-header.css';
import './styles/pages/amazon.css';

import { AmazonHeader } from './Amazon/AmazonHeader';
import { AmazonContent } from './Amazon/AmazonContent';

export const Amazon = () => {
  console.log('Amazon home');
  return (
    <>
        <AmazonHeader key="1"/>
        <AmazonContent key="2"/>
    </>
  );
}