import React, { useState, useEffect, useRef } from "react";
import { useSpring, animated } from "react-spring";

function formatNumber(num) {
  return Math.floor(num)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default function() {
  const [data, setData] = useState({ total: 0 });
  async function fetchData() {
    const response = await fetch(
      "/looker/looks/D8bP6zx4yMsdStk7nTJdNtrm82gTPx6N.json",
      { referrer: "" }
    );
    const data = await response.json();
    setData(data[0]);
  }

  useEffect(() => {
    if (!data.total) {
      fetchData();
    }
  });

  useInterval(fetchData, 1000 * 6);

  const subprops = useSpring({
    config: { duration: 1000 },
    to: [{ opacity: 1, color: "#ffffff" }],
    from: { opacity: 0, color: "#291e50" }
  });

  const value = useSpring({
    total: data.total
  });

  return (
    <>
      <animated.div className="subtitle-container">
        {value.total.interpolate(val => formatNumber(val))}
      </animated.div>
      <animated.div className="explanation-container" style={subprops}>
        "Only" <strong>{formatNumber(1000000000 - data.total)}</strong> to go.
        Let's make it happen together!
      </animated.div>
    </>
  );
}
