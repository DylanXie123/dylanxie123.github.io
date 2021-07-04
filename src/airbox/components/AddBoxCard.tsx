import React, { useContext, useState } from "react";
import { AirBoxModelContext } from "../model/box_model";

const AddBoxCard = () => {
  const airBoxModel = useContext(AirBoxModelContext);
  const [content, update] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    airBoxModel.create(content);
  }

  return (
    <div style={{ border: '1px solid' }}>
      <form onSubmit={handleSubmit}>
        <input type='text' value={content} onChange={(event)=>{update(event.target.value)}}></input>
        <input type='submit'></input>
      </form>
    </div>
  );
}

export default AddBoxCard