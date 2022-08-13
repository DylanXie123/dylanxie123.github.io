import React, { useState } from "react";
import { useAirBoxModel } from "../model/airboxModels";

const AddBoxCard = () => {
  const airBoxModel = useAirBoxModel();
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

  const style: React.CSSProperties = {
    width: '100%',
    padding: '5px',
    boxSizing: 'border-box',
    backgroundColor: 'grey',
    position: 'fixed',
    bottom: '0',
  }

  return (
    <div style={style}>
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