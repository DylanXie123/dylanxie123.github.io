import { observer } from "mobx-react-lite";
import React from "react";
import { useExpStore } from "../model/expression";

const HistoryBox = observer(() => {
  const exp = useExpStore();
  return (
    <div style={{}}>
      <ul>
        {exp.getHistory.map(item => {
          return (<li key={item.date}>{item.expStr}</li>);
        })}
      </ul>
    </div>
  );
});

export default HistoryBox;