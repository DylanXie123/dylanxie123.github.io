import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Mode, useExpStore } from "../model/expression";
import MathView from 'react-math-view';
import { ControllerContext } from "../model/controller";
import Plot from "./Plot";

const ResultBox = () => {
  const exp = useExpStore();

  switch (exp.mode) {
    case Mode.Eval:
      return withGrid(<EvalResultBox />);
    case Mode.Var:
      return (<SymResultBox />);
    default:
      return (<EvalResultBox />);
  }
};

const withGrid = (Component: JSX.Element) => {
  return (
    <div style={{  }}>
      {Component}
    </div>
  );
}

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
    <p>{exp.latex}</p>
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
    <p>{exp.latex}</p>
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
    <div>
      <MathView
        value={prop.content}
        readOnly={true}
        style={{ outline: 0, display: 'inline-block' }}
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