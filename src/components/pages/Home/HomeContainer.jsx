import React, { useState, useEffect } from 'react';
import RenderDashboard from './RenderDashboard';
import { TransactionsProvider } from '../../../state';
import { NavBar } from '../NavBar';

//home container should have state

function HomeContainer() {
  return (
    <>
      <NavBar loc="HomeContainer" />
      <TransactionsProvider>
        <RenderDashboard />
      </TransactionsProvider>
    </>
  );
}

export default HomeContainer;
