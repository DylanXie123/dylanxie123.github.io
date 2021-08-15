import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { AirBoxModelContext } from "../model/box_model";

const UpdatingIndicator = observer(() => {
  const airBoxModel = useContext(AirBoxModelContext);
  if (airBoxModel.isLoading) {
    return <p>Updating...</p>
  } else {
    return null;
  }
})

export default UpdatingIndicator;