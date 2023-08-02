import React, { useState } from "react";
import classes from './Counter.module.scss';
export const Counter = () => {
  const [count, setCounter] = useState(0);

  const increment = () => {
    setCounter(count+1);
  }
  return <div>
    <button onClick={increment} className={classes.btn}>
      +1
    </button>
    <span>{count}</span>
  </div>
}