import Tick from "@pqina/flip";
import "@pqina/flip/dist/flip.min.css";
import React, { useEffect, useRef } from "react";

const FlipClock = ({ value }:any) => {
  const divRef = useRef();

  const tickRef = useRef();

  useEffect(() => {
    const currDiv = divRef.current;
    const didInit = (tick) => {
      tickRef.current = tick;
    };
    Tick.DOM.create(currDiv, {
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
    const tickValue = tickRef.current;
    return () => Tick.DOM.destroy(tickValue);
  });

  useEffect(() => {
    if (tickRef.current) {
      tickRef.current.value = value;
    }
  }, [value]);

  return <div ref={divRef} />;
};

export default FlipClock;
