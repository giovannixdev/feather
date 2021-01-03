import React, { useState, useEffect } from 'react';
import RenderHomePage from './RenderHomePage';
import { TransactionsProvider } from '../../../state';

//home container should have state

function HomeContainer() {
  return (
    <TransactionsProvider>
      <RenderHomePage />
    </TransactionsProvider>
  );
}

export default HomeContainer;
