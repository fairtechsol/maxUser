import TickModule from "@pqina/flip";
import "@pqina/flip/dist/flip.min.css";
import React, { useEffect, useRef } from "react";

/**
 * @typedef {Object} Tick
 * @property {number|string} value - The value of the tick
 */

/**
 * @typedef {Object} FlipClockProps
 * @property {number|string} value - The value to display on the clock
 */

/**
 * @param {FlipClockProps} props
 */
const FlipClock = ({ value }) => {
  const divRef = useRef(null);
  /** @type {React.MutableRefObject<Tick|null>} */
  const tickRef = useRef(null);

  useEffect(() => {
    const currDiv = divRef.current;
    if (!currDiv) return; // Ensure currDiv is not null

    /**
     * @param {Tick} tick
     */
    const didInit = (tick) => {
      tickRef.current = tick;
    };

    TickModule.DOM.create(currDiv, {
      value,
      didInit,
      repeat: true,

      view: {
        children: [
          {
            root: "div",
            style: ".tick",
            repeat: true,
            children: [
              {
                view: "flip",
              },
            ],
          },
        ],
      },
    });

    return () => {
      if (tickRef.current) {
        TickModule.DOM.destroy(tickRef.current);
      }
    };
  }, []); // Empty dependency array to ensure this runs only once

  useEffect(() => {
    if (tickRef.current) {
      tickRef.current.value = value;
    }
  }, [value]); // Dependency array with value

  return <div ref={divRef}></div>;
};

export default FlipClock;
