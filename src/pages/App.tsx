import React from 'react';
import { Header } from '../components/Header';

interface Item {
  title: string;
  sendDate: Date;
}

const items: Item[] = [
  {
    title: 'item 1',
    sendDate: new Date(),
  },
  {
    title: 'item 1',
    sendDate: new Date(),
  },
];

function App() {
  return (
    <div className="App">
      <Header />
      {items.map((item) => (
        <li>
          {item.title} - {item.sendDate.toString()}
        </li>
      ))}
    </div>
  );
}

export default App;
