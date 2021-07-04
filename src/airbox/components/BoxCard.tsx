import React, { useContext } from "react";
import Box from "../model/box";
import { AirBoxModelContext } from "../model/box_model";

interface BoxCardProp {
  box: Box
}

const BoxCard = (prop: BoxCardProp) => {
  const airBoxModel = useContext(AirBoxModelContext);

  return (
    <div style={{border: '1px solid'}}>
      {prop.box.content}
      <button onClick={()=>{airBoxModel.delete(prop.box.id)}}>Delete</button>
    </div>
  );
}

export default BoxCard