import React, { useState } from 'react';
import RenderNavBar from './RenderNavBar';

function NavBarContainer({ loc }) {
  console.count(`* NavBar was render from ${loc}`);

  return <RenderNavBar />;
}

export default NavBarContainer;
