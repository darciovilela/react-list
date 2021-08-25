import React, { useEffect, useState } from 'react';
import { Item } from '../../entities/items';

interface IProps {
  action: Function;
  activeRecord: Item;
}

export const Form: React.FC<IProps> = ({ action, activeRecord }) => {
  const [formState, setFormState] = useState<Item>(activeRecord);

  useEffect(() => {
    setFormState(activeRecord);
  }, [activeRecord]);

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
