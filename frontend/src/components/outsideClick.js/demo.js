import { useState } from 'react';
import { createRoot } from 'react-dom/client';

import Dropdown from './index';

function App() {
  const [vegetable, setVegetable] = useState(undefined);
  const [fruit, setFruit] = useState(undefined);

  return (
    <div className="App">
      <Dropdown
        placeholder="Select Vegetable"
        value={vegetable}
        onChange={(v) => setVegetable(v)}
        options={['Tomato', 'Cucumber', 'Potato']}
      />
      <Dropdown
        placeholder="Select Fruit"
        value={fruit}
        onChange={(v) => setFruit(v)}
        options={['Apple', 'Banana', 'Orange', 'Mango']}
      />
    </div>
  );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<App />);
}
