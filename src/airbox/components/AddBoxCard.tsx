import React, { useContext, useState } from "react";
import { BoxType } from "../model/box";
import { AirBoxModelContext } from "../model/box_model";

const AddBoxCard = () => {
  const airBoxModel = useContext(AirBoxModelContext);
  const [content, update] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    airBoxModel.create({
      content: content,
      boxType: BoxType.Text,
    }).catch(() => {alert('Fail to add')});
    update('');
  }


  return (
    <div style={{ border: '1px solid' }}>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder={'Just type something😎'}
          required
          value={content}
          onChange={(e) => update(e.target.value)}
        />
        <input type='submit' />
      </form>
    </div>
  );
}

export default AddBoxCard