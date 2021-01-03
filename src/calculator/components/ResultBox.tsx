import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { ExpContext } from "../model/expression";
import MathView from 'react-math-view';
import { Container, List } from "@material-ui/core";
import { css } from "@emotion/css";

const ResultBox = observer(() => {
  const exp = useContext(ExpContext);
  console.log(exp.latex);

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
  return (<Container className={css({
    border: '1pt',
    borderStyle: 'solid',
    margin: '2pt'
  })}>
    <p className={css({
      backgroundColor: 'yellow'
    })}>{prop.title}</p>
    <MathView
      value={prop.content}
      readOnly={true}
    />
  </Container>);

}

export default ResultBox;