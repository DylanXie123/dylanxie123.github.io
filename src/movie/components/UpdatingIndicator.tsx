import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { MovieModelContext } from "../model/movie_model";

const UpdatingIndicator = observer(() => {
  const movieModel = useContext(MovieModelContext);
  if (movieModel.isUpdating) {
    return <p>Updating...</p>
  } else {
    return null;
  }
})

export default UpdatingIndicator;