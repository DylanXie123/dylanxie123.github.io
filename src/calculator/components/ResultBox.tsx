import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { ExpContext } from "../model/expression";
import MathView from 'react-math-view';
import { Container, List } from "@material-ui/core";

const ResultBox = observer(() => {
  const exp = useContext(ExpContext);

  return (<List>
    <InfoBox
      title={'Eval'}
      content={exp.eval}
    />
    <InfoBox
      title={'Text'}
      content={exp.text}
    />
    <InfoBox
      title={'Roots'}
      content={exp.solve}
    />
    <InfoBox
      title={'Int'}
      content={exp.integrate}
    />
    <InfoBox
      title={'Diff'}
      content={exp.diff}
    />
  </List>)
});

interface InfoBoxProp {
  title: string,
  content: string,
}

function InfoBox(prop: InfoBoxProp) {
  return (<Container className='info-box'>
    <p>{prop.title}</p>
    <MathView
      value={prop.content}
      readOnly={true}
    />
  </Container>);

}

export default ResultBox;