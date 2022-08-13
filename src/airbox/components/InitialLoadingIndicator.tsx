import { observer } from "mobx-react-lite";
import React from "react";
import { useAirBoxModel } from "../model/airboxModels";

const InitialLoadingIndicator = observer(() => {
  const airBoxModel = useAirBoxModel();
  if (airBoxModel.getModels.length === 0
    && airBoxModel.getUpdatingItemID !== null) {
    return (<p>Loading...</p>);
  } else {
    return null;
  }
})

export default InitialLoadingIndicator;