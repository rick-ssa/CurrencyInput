import { useEffect, useState } from 'react';

import './App.css';
import CurrencyInput from './components/CurrencyInput';


function App() {
  const [numero,setNumero] = useState(0)
  const [helperText,setHelperText] = useState('')
  const [error, setError] = useState(false)

  useEffect(()=>{
    setHelperText(`valor máximo ${maxValue}`)
  },[])

  const handleOverFlow = (moedaValue:string) => {
    setError(true)
    setHelperText(`${moedaValue} é maior que ${maxValue}`)
  }

  const handleOnChange = (callBack:any) => {
    if (error === true) {
      setError(false)
      setHelperText(`valor máximo ${maxValue}`)
    }
    setNumero(callBack)
  }

  const maxValue = 100000

  return (
    <div className={'App'}>
      <CurrencyInput 
        variant='outlined'
        numero={numero} 
        color="primary" 
        autoFocus 
        label='valor' 
        symbolStart='R$'
        maxValue={maxValue}
        onChange={handleOnChange} 
        onOverFlow={handleOverFlow}
        error = {error}
        helperText = {helperText}
        symbolEnd='%'
      />

    </div>
  );
}

export default App;
