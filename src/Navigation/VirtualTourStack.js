import React from 'react';
import Flash from '../Screen/Auth/Flash';
import VirtualTour from '../Screen/Auth/VirtualTour';

const VirtualTourStack = Stack => {
  return (
    <>
      <Stack.Screen name="Flash" component={Flash} />
      <Stack.Screen name="virtualTour" component={VirtualTour} />
    </>
  );
};

export default VirtualTourStack;
