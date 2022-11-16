import { useState } from 'react';

import './App.css';
import CurrencyInput from './components/CurrencyInput';


function App() {
  const [numero,setNumero] = useState(0)

  return (
    <div className={'App'}>
      <CurrencyInput 
        variant='outlined'
        numero={numero} 
        color="primary" 
        autoFocus 
        label='valor' 
        onChange={setNumero} 
      />

    </div>
  );
}

export default App;
