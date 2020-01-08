/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "./App.css";
import './index.css';
import { useSpring, animated } from "react-spring";

import earth from "./images/earth.svg";
import moon from "./images/moon.svg";
import ufo from "./images/ufo.svg";
import monster from "./images/monster.svg";
import spaceship from "./images/spaceship.svg";
import star from "./images/star.svg";
import sdgs from "./images/sdgs.png";

function App() {
  const value = 152247;

  const spring = useSpring({
    config: { duration: 2000 },
    from: { val: 0 },
    to: { val: value }
  });

  const subprops = useSpring({
    config: { duration: 1000 },
    to: [{ opacity: 1, color: "#ffffff" }],
    from: { opacity: 0, color: "#291e50" }
  });

  const { rotateZ } = useSpring({
    config: { duration: 500000 },
    from: {
      rotateZ: 0
    },
    to: {
      rotateZ: 360
    }
  });
 
  const interp = r => `rotate(10deg) translate3d(0, ${15 * Math.sin(r + (2 * Math.PI) / 1.6)}px, 0)`

  const { radians } = useSpring({
    to: async next => {
      while (1) await next({ radians: 2 * Math.PI })
    },
    from: { radians: 0 },
    config: { duration: 3500 },
    reset: true,
  })
 

  const calc = (x, y) => [
    x - window.innerWidth / 2,
    y - window.innerHeight / 2
  ];
  const trans1 = (x, y) => `translate3d(${x / 140}px,${y / 140}px,0)`;
  const trans2 = (x, y) => `translate3d(${x / 120}px,${y / 120}px,0)`;
  const trans3 = (x, y) => `translate3d(${x / 100}px,${y / 100}px,0)`;
  const trans4 = (x, y) => `translate3d(${x / 25}px,${y / 25}px,0)`;
  const trans5 = (x, y) => `translate3d(${x / 200}px,${y / 200}px,0)`;
  const trans6 = (x, y) => `translate3d(${x / 15}px,${y / 15}px,0)`;

  const [props, set] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 10, tension: 550, friction: 140 }
  }));

  function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  return (
    <>
      <div
        className="container"
        onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}
      >
        <div className="earth-container">
          <img className="earth" src={earth}></img>
        </div>
        <div className="moon-container">
          <img className="moon" src={moon}></img>
        </div>
        <div className="monster-container">
          <img className="monster" src={monster}></img>
        </div>
        <animated.div className="title-container" style={subprops}>
          # people acting upon their purpose
        </animated.div>
        <animated.div className="subtitle-container">{spring.val.interpolate(val => Math.floor(val))}</animated.div>
        <animated.div className="explanation-container" style={subprops}>
          "Only" <strong>{formatNumber(1000000000 - value)}</strong> to go.
          Let's make it happen together!
        </animated.div>
        <animated.div
          className="spaceship-container"
          style={{ transform: props.xy.interpolate(trans4) }}
        >
          {" "}
          <img className="spaceship" src={spaceship}></img>
        </animated.div>
        <animated.div
          className="sdgs-container"
          style={{
            transform: rotateZ.interpolate(z => `rotateZ(${z}deg)`)
          }}
        >
          <img className="sdgs" src={sdgs}></img>
        </animated.div>
        <animated.div className="ufo-container" style={{ transform: radians.interpolate(interp)}}>
          <img className="ufo" src={ufo}></img>
        </animated.div>
        <animated.div
          className="stars-container"
          style={{ transform: props.xy.interpolate(trans1) }}
        >
          <img className="star" src={star}></img>
        </animated.div>
        <animated.div
          className="stars-container-2"
          style={{ transform: props.xy.interpolate(trans1) }}
        >
          <img className="star" src={star}></img>
        </animated.div>
        <animated.div
          className="stars-container-3"
          style={{ transform: props.xy.interpolate(trans1) }}
        >
          <img className="star" src={star}></img>
        </animated.div>
        <animated.div
          className="stars-container-4"
          style={{ transform: props.xy.interpolate(trans2) }}
        >
          <img className="star" src={star}></img>
        </animated.div>
        <animated.div
          className="stars-container-5 svg"
          style={{ transform: props.xy.interpolate(trans2) }}
        >
          <img className="star" src={star}></img>
        </animated.div>
        <animated.div
          className="stars-container-6"
          style={{ transform: props.xy.interpolate(trans2) }}
        >
          <img className="star" src={star}></img>
        </animated.div>
      </div>
    </>
  );
}

export default App;
