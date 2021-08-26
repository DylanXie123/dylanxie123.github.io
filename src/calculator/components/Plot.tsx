import React, { useEffect, useRef } from 'react'
import functionPlot from 'function-plot';

interface PlotProp {
  expStr: string,
}

const Plot = (prop: PlotProp) => {
  let rootEl = useRef(null);

  useEffect(() => {
    try {
      functionPlot({
        target: rootEl.current ?? "",
        width: 800,
        height: 300,
        grid: true,
        title: prop.expStr,
        data: [{
          fn: prop.expStr,
        }]
      })
    } catch (e) { }
  })

  return (<div ref={rootEl} />)
}

export default Plot;