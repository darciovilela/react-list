import React, { useState } from 'react';
import { Header } from '../components/Header';

import { Item } from '../entities/items';

const items: Item[] = [
  {
    title: 'item 1',
    sendDate: new Date(),
  },
  {
    title: 'item 2',
    sendDate: new Date(),
  },
];

function App() {
  const [activeRecord, setActiveRecord] = useState<Item>();
  return (
    <div className="App">
      <div>
        <h3>ActiveRecord:</h3> {JSON.stringify(activeRecord)}
      </div>
      <div>
        <h3>Items</h3>
        {items.map((item) => (
          <li onClick={() => setActiveRecord(item)}>
            {item.title} - {item.sendDate.toString()}
          </li>
        ))}
      </div>
    </div>
  );
}

export default App;
