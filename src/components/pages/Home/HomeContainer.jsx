import React, { useState, useEffect } from 'react';
import RenderHomePage from './RenderHomePage';
import { TransactionsProvider } from '../../../state';
import axios from 'axios';

function HomeContainer() {
  return (
    <TransactionsProvider>
      <RenderHomePage />
    </TransactionsProvider>
  );
}

export default HomeContainer;
