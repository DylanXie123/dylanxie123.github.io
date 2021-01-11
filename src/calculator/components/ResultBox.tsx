import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { ExpContext, Mode } from "../model/expression";
import MathView from 'react-math-view';

const ResultBox = observer(() => {
  const exp = useContext(ExpContext);

  switch (exp.mode) {
    case Mode.Eval:
      return (<EvalResultBox />);
    case Mode.Var:
      return (<SymResultBox />);
    default:
      return (<EvalResultBox />);
  }
});

const EvalResultBox = observer(() => {
  const exp = useContext(ExpContext);
  const evalResult = exp.eval;
  const textResult = exp.text;

  if (evalResult === textResult) {
    return (<InfoBox content={`=${evalResult}`} />);
  }

  return (<div>
    <InfoBox content={`=${exp.eval}`} />
    <InfoBox content={`=${exp.text}`} />
  </div>);
});


const SymResultBox = observer(() => {
  const exp = useContext(ExpContext);

  return (<div>
    <InfoBox content={`=${exp.integrate}`} />
    <InfoBox content={`=${exp.diff}`} />
  </div>);
});

interface InfoBoxProp {
  content: string,
}

function InfoBox(prop: InfoBoxProp) {
  return (<MathView
    value={prop.content}
    readOnly={true}
    style={{ outline: 0, fontSize: '1.2em' }}
  />);
}

export default ResultBox;