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

  const handleOverFlow = (valores:{valorDecimal:string}) => {
    setError(true)
    setHelperText(`${valores.valorDecimal} é maior que ${maxValue}`)
  }

  const handleOnChange = (callBack:any) => {
    if (error === true) {
      setError(false)
      setHelperText(`valor máximo ${maxValue}`)
    }
    setNumero(callBack)
  }

  const maxValue = 100

  return (
    <div className={'App'}>
      <CurrencyInput 
        variant='outlined'
        numero={numero} 
        
        color="primary"  
        label='valor' 
        onChange={handleOnChange} 
        onOverFlow={handleOverFlow}
        error = {error}
        helperText = {helperText}
        symbolEnd='%'
        autoFocus
        maxValue={maxValue}
      />

    </div>
  );
}

export default App;
