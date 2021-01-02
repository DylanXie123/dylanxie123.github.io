import { observer } from "mobx-react";
import React, { useContext } from "react";
import { combineConfig, MathfieldComponent } from "react-mathlive/dist/MathfieldComponent";
import Expression, { ExpContext } from "../model/expression";

export default function ResultBox() {
  const exp = useContext(ExpContext);
  return (
    <ResultBoxView exp={exp} />
  );
}

const config = combineConfig(
  { initialLatex: '' }
)
config.readOnly = true;

const ResultBoxView = observer((
  { exp }: { exp: Expression }) => (
  <ul>
    <li>
      <span>Latex:</span>
      <MathfieldComponent
        latex={exp.latex}
        mathfieldConfig={config}
      />
    </li>
    <li>{'Result: ' + exp.eval}</li>
    <li>
      <span>Text:</span>
      <MathfieldComponent
        latex={exp.text}
        mathfieldConfig={config}
      />
    </li>
    <li>
      <span>Roots:</span>
      <MathfieldComponent
        latex={exp.solve}
        mathfieldConfig={config}
      />
    </li>
    <li>
      <span>Int:</span>
      <MathfieldComponent
        latex={exp.integrate}
        mathfieldConfig={config}
      />
    </li>
    <li>
      <span>Diff:</span>
      <MathfieldComponent
        latex={exp.diff}
        mathfieldConfig={config}
      />
    </li>
  </ul>
));