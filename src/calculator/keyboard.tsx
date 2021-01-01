import React, { useContext } from "react";
import { ControllerContext } from "./controller";

export default function MathKeyboard() {
  const controller = useContext(ControllerContext);
  return (<div>
    <button onClick={() => controller.add('1')}>
      ADD 1
    </button>
    <button onClick={() => controller.add('2')}>
      ADD 2
    </button>
  </div>);
}