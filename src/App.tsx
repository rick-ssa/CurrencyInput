import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import CurrencyInput from './components/CurrencyInput';
import { TextField, InputAdornment } from '@material-ui/core';


function App() {
  const [numero,setNumero] = useState(0)

  
  return (
    <div className={'App'}>
      <CurrencyInput 
      variant='outlined'
      numero={numero} color="primary" autoFocus label='valor' onChange={setNumero} />

    </div>
  );
}

export default App;
