import { observer } from "mobx-react-lite";
import React from "react";
import { useAirBoxModel } from "../model/airboxModels";

const UpdatingIndicator = observer(() => {
  const airBoxModel = useAirBoxModel();
  if (airBoxModel.getUpdatingItem > -1) {
    return (<p>Updating...</p>);
  } else {
    return null;
  }
})

export default UpdatingIndicator;