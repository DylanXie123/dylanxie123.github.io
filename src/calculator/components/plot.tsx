import React, { useEffect, useRef } from 'react'
import functionPlot from 'function-plot';
import Expression, { ExpContext } from '../model/expression';
import { observer } from 'mobx-react';

export default function Plot() {
  return (
  <ExpContext.Consumer>
    {exp => <PlotView fn={exp}/>}
  </ExpContext.Consumer>
  );
}

const PlotView = observer(({ fn }: {fn: Expression}) => {
  const rootEl = useRef(null);
  const options = {
    target: "",
    width: 800,
    height: 500,
    yAxis: { domain: [-1.2, 1.2] },
    grid: true,
    data: [{
      fn: fn?.text,
    }]
  };

  useEffect(() => {
    try {
      functionPlot(Object.assign({}, options, { target: rootEl.current }))
    } catch (e) { }
  })

  return (<div ref={rootEl} />)
})