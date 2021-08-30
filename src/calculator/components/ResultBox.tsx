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
      return (<EvalResultBox />);
    case Mode.Var:
      return (<SymResultBox />);
    default:
      return (<EvalResultBox />);
  }
});

const EvalResultBox = observer(() => {
  const exp = useExpStore();
  const evalResult = exp.eval;
  const textResult = exp.text;

  if (evalResult === undefined) {
    if (exp.getRawLaTeX) {
      return <InfoBox title={'LaTeX'} content={exp.getRawLaTeX} useMathView={false} />;
    } else {
      return null
    }
  }

  if (evalResult === textResult) {
    return (
      <div>
        <InfoBox title={'LaTeX'} content={exp.getRawLaTeX} useMathView={false} />
        <InfoBox title={'Eval'} content={`${evalResult}`} useMathView />
      </div>
    );
  }

  return (
    <div>
      <InfoBox title={'LaTeX'} content={exp.getRawLaTeX} useMathView={false} />
      <InfoBox title={'Eval'} content={`${exp.text}`} useMathView />
      <InfoBox title={'Calc'} content={`${exp.eval}`} useMathView />
    </div>
  );
});


const SymResultBox = observer(() => {
  const exp = useExpStore();

  if (exp.integrate === undefined) {
    return null;
  }

  return (
    <div>
      <InfoBox title={'LaTeX'} content={exp.getRawLaTeX} useMathView={false} />
      <InfoBox title={'Integrate'} content={`${exp.integrate}`} useMathView />
      <InfoBox title={'Diff'} content={`${exp.diff}`} useMathView />
      {exp.eval ? <Plot expStr={exp.eval} /> : null}
    </div>
  );
});

interface InfoBoxProp {
  title: string,
  content: string,
  useMathView: boolean,
}

const InfoBox = (prop: InfoBoxProp) => {

  const Component = prop.useMathView ?
    <ExprBox content={prop.content} /> :
    <TextBox content={prop.content} />;

  return (
    <div style={{ border: '1px solid black' }}>
      <div style={{ backgroundColor: 'black', color: 'white', padding: 2, paddingLeft: 10, fontFamily: 'KaTeX', userSelect: "none" }}>{prop.title}</div>
      <div style={{ padding: 5, paddingLeft: 10 }}>
        {Component}
      </div>
    </div>
  );
}

const ExprBox = (prop: { content: string }) => {
  const controller = useContext(ControllerContext);
  return (
    <>
      <MathView
        value={prop.content}
        readOnly={true}
        style={{ outline: 0, display: 'inline-block' }}
        fontsDirectory={'../assets/fonts'}
      />
      <button
        style={{ marginLeft: '20pt' }}
        onClick={() => {
          controller.clear();
          controller.add(prop.content);
        }}
        children={'+'} />
    </>
  );
};

const TextBox = (prop: { content: string }) => {
  return (
    <span style={{ fontFamily: "KaTeX" }}>{prop.content}</span>
  );
}

export default ResultBox;