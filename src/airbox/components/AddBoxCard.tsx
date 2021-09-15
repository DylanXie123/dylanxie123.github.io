import React, { useContext, useState } from "react";
import { AirBoxModelContext } from "../model/box_model";

const AddBoxCard = () => {
  const airBoxModel = useContext(AirBoxModelContext);
  const [content, update] = useState('');
  const fileInput = React.createRef<HTMLInputElement>();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    airBoxModel.createText(content)
      .catch(() => { alert('Fail to add') });
    update('');
  }

  const handleFileSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (fileInput.current && fileInput.current.files) {
      airBoxModel.createFile(fileInput.current.files[0]);
    }
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
      <form onSubmit={handleFileSubmit}>
        <input
          type='file'
          ref={fileInput}
        />
        <input type='submit' />
      </form>
    </div>
  );
}

export default AddBoxCard