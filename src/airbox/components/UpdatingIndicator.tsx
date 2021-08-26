import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { AirBoxModelContext } from "../model/box_model";

const UpdatingIndicator = observer(() => {
  const airBoxModel = useContext(AirBoxModelContext);
  switch (airBoxModel.getStatue) {
    case "loading":
      return (<p>Updating...</p>);
    case "error":
      return (<p>Error😥</p>);
    default:
      return null;
  }
})

export default UpdatingIndicator;