import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Header } from '../components/Header';
import { Item } from '../entities/items';

function App() {
  const [records, setRecords] = useState<Item[]>();
  const [activeRecord, setActiveRecord] = useState<Item>();

  const fetch = async () => {
    const result = await axios.get<Item[]>('http://localhost:4000/items');
    setRecords(result.data);
  };

  const create = async () => {
    await axios.post<Item>('http://localhost:4000/items', {
      title: 'item post',
      sendDate: '2021-09-19T18:56:23.027Z',
    });
    fetch();
  };

  const remove = async (record: Item) => {
    await axios.delete<Item>(`http://localhost:4000/items/${record.id}`);
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
        <button onClick={() => create()}>Create New Item</button>
      </div>
      <div>
        <h3>ActiveRecord:</h3> {JSON.stringify(activeRecord)}
      </div>
      <div>
        <h3>Items</h3>
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
