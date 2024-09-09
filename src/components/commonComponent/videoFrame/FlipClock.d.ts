// FlipClock.d.ts

import { FC } from 'react';

interface FlipClockProps {
  value: number | string; // Adjust the type according to what `value` should be
  color?: string;
}

interface Tick {
    value: number | string;
    // Add other properties of the Tick object if needed
  }

declare const FlipClock: FC<FlipClockProps>;

export default FlipClock;
