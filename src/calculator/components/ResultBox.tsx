import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Mode, useExpStore } from "../model/expression";
import MathView from 'react-math-view';
import { ControllerContext } from "../model/controller";
import Plot from "./Plot";

const ResultBox = observer(() => {
  const exp = useExpStore();

  switch (exp.mode) {
    case Mode.Eval:
      return (<>
        <p>{exp.latex}</p>
        <EvalResultBox />
      </>);
    case Mode.Var:
      return (<>
        <p>{exp.latex}</p>
        <SymResultBox />
      </>);
    default:
      return (<EvalResultBox />);
  }
});

const EvalResultBox = observer(() => {
  const exp = useExpStore();
  const evalResult = exp.eval;
  const textResult = exp.text;

  if (evalResult === undefined) {
    return <div></div>;
  }

  if (evalResult === textResult) {
    return (<InfoBox content={`=${evalResult}`} />);
  }

  return (<div>
    <InfoBox content={`=${exp.eval}`} />
    <InfoBox content={`=${exp.text}`} />
  </div>);
});


const SymResultBox = observer(() => {
  const exp = useExpStore();

  if (exp.integrate === undefined) {
    return <div></div>;
  }

  return (<div>
    <InfoBox content={`=${exp.integrate}`} />
    <InfoBox content={`=${exp.diff}`} />
    {exp.eval ? <Plot expStr={exp.eval} /> : null}
  </div>);
});

interface InfoBoxProp {
  content: string,
  hideAdd?: boolean,
}

function InfoBox(prop: InfoBoxProp) {
  const controller = useContext(ControllerContext);
  return (
    <div style={{ display: 'flex' }}>
      <MathView
        value={prop.content}
        readOnly={true}
        style={{ outline: 0 }}
        fontsDirectory={'../assets/fonts'}
      />
      <button
        hidden={prop.hideAdd}
        style={{ height: '50%', marginLeft: '20pt' }}
        onClick={() => {
          controller.clear();
          controller.add(prop.content.substr(1));
        }}>
        +
      </button>
    </div>
  );
}

export default ResultBox;