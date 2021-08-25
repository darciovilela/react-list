import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Header } from '../components/Header';
import { Item, emptyItem } from '../entities/items';
import { Form } from './tasks/Form';

function App() {
  const [records, setRecords] = useState<Item[]>();
  const [activeRecord, setActiveRecord] = useState<Item>(emptyItem);

  const fetch = async () => {
    const result = await axios.get<Item[]>('http://localhost:4000/items');
    setRecords(result.data);
  };

  const create = async (record: Item) => {
    await axios.post<Item>('http://localhost:4000/items', record);
    setActiveRecord({ ...emptyItem });
    fetch();
  };

  const remove = async (record: Item) => {
    await axios.delete<Item>(`http://localhost:4000/items/${record.id}`);
    fetch();
  };

  const update = async (record: Item) => {
    await axios.put<Item>(`http://localhost:4000/items/${record.id}`, record);
    setActiveRecord({ ...emptyItem });
    fetch();
  };

  useEffect(() => {
    fetch();
  }, []);

  if (!records) return <div>Loading...</div>;

  return (
    <div className="App">
      <Header />

      <div>
        <h3>ActiveRecord:</h3> {JSON.stringify(activeRecord)}
        <Form
          action={activeRecord.id ? update : create}
          activeRecord={activeRecord}
        />
      </div>
      <div>
        <h3>Items:</h3>
        <ul>
          {records.map((record) => (
            <li key={record.id}>
              <button onClick={() => setActiveRecord(record)}>E</button>
              <button onClick={() => remove(record)}>X</button>
              {record.title} - {record.sendDate}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
