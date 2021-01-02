import { observer } from "mobx-react";
import React, { useContext } from "react";
import { ExpContext } from "../model/expression";
import MathView from 'react-math-view';

const ResultBox = observer(() => {
  const exp = useContext(ExpContext);
  return (<ul>
    <li>
      <span>Latex:</span>
      <MathView
        value={exp.latex}
        readOnly={true}
      />
    </li>
    <li>{'Result: ' + exp.eval}</li>
    <li>
      <span>Text:</span>
      <MathView
        value={exp.text}
        readOnly={true}
      />
    </li>
    <li>
      <span>Roots:</span>
      <MathView
        value={exp.solve}
        readOnly={true}
      />
    </li>
    <li>
      <span>Int:</span>
      <MathView
        value={exp.integrate}
        readOnly={true}
      />
    </li>
    <li>
      <span>Diff:</span>
      <MathView
        value={exp.diff}
        readOnly={true}
      />
    </li>
  </ul>)
});

export default ResultBox;