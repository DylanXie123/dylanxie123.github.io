import { observer } from "mobx-react-lite";
import React from "react";
import { ExprHistory, useExpStore } from "../model/expression";

const HistoryBox = observer(() => {
  const exp = useExpStore();
  return (
    <div style={{ border: '1px solid black' }}>
      <div style={{ backgroundColor: 'black', color: 'white', padding: 5, paddingLeft: 10 }}>History</div>
      <ul style={{ listStyleType: 'none', paddingInline: 10 }}>
        {exp.getHistory.map((item, index) => {
          return (<ItemContainer key={index} item={item} />);
        })}
      </ul>
    </div>
  );
});

const ItemContainer = (prop: { item: ExprHistory }) => {

  const exp = useExpStore();

  const handleClick = () => {
    exp.deleteHistory(prop.item);
  }

  return (
    <li style={{ display: "flex", justifyContent: 'space-between' }}>
      <span style={{ marginRight: 20 }}>{prop.item.expStr}</span>
      <button onClick={handleClick}>Del</button>
    </li>
  )
}

export default HistoryBox;