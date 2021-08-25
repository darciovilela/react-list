import React, { useState } from 'react';
import { Item, emptyItem } from '../../entities/items';

interface IProps {
  action: Function;
}

export const Form: React.FC<IProps> = ({ action }) => {
  const [formState, setFormState] = useState<Item>(emptyItem);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    action(formState);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>formState:</h3>
      <pre>{JSON.stringify(formState)}</pre>
      <div>
        <label>Title: </label>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          value={formState.title}
        />
      </div>
      <div>
        <label>Send Date: </label>
        <input
          type="text"
          name="sendDate"
          onChange={handleChange}
          value={formState.sendDate.toString()}
        />
      </div>
      <input type="submit" />
    </form>
  );
};
