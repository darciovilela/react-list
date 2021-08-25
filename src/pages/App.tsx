import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Header } from '../components/Header';
import { Item, emptyItem } from '../entities/items';
import { Form } from './tasks/Form';

function App() {
  const [records, setRecords] = useState<Item[]>();
  const [activeRecord, setActiveRecord] = useState<Item>(emptyItem);

  const url = 'http://localhost:4000/items';

  const fetch = async () => {
    const result = await axios.get<Item[]>(url);
    setRecords(result.data);
  };

  const create = async (record: Item) => {
    await axios.post<Item>(url, record);
    mutationCallback();
  };

  const remove = async (record: Item) => {
    await axios.delete<Item>(`${url}/${record.id}`);
    mutationCallback();
  };

  const update = async (record: Item) => {
    await axios.put<Item>(`${url}/${record.id}`, record);
    mutationCallback();
  };

  const mutationCallback = () => {
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
