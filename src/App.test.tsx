import React, { useState } from 'react';
import { fireEvent, render, renderHook, screen, waitFor } from '@testing-library/react';
import App from './App';
import CurrencyInput from './components/CurrencyInput';
import userEvent from '@testing-library/user-event';

describe('Testando o componente CurrencyInput', () => {
  
  
  test('valor inicial deverá ser 0,00',()=>{ 
    const {result:{current:[numero,setNumero]}} = renderHook(()=> useState(0))

    render(<CurrencyInput
      numero={numero}
      onChange={setNumero}
    />);
    const textElement = screen.getByRole("textbox");
    screen.debug(textElement)
    expect(textElement).toHaveValue("0,00");
  })

  test('nao deverá mudar o valor apos inserçao de caractere nao numerico',()=>{
    const {result:{current:[numero,setNumero]}} = renderHook(()=> useState(0))

    render(<CurrencyInput
      numero={numero}
      onChange={setNumero}
    />);
    const textElement = screen.getByRole("textbox");
    fireEvent.change(textElement,{target: {value:'a'}});
    screen.debug(textElement)
    expect(textElement).toHaveValue("0,00");
  })

  test('deverá mudar o valor apos inserçao de caractere numerico',()=>{
    const {result:{current:[numero,setNumero]}} = renderHook(()=> useState(0))

    render(<CurrencyInput
      numero={numero}
      onChange={setNumero}
    />);
    const textElement = screen.getByRole("textbox");
    fireEvent.change(textElement,{target: {value:'12'}});
    screen.debug(textElement)
    expect(textElement).toHaveValue("12");
  })

  test('deverá mudar o formato ao ganhar e perder foco',async ()=>{
    const {result:{current:[numero,setNumero]}} = renderHook(()=> useState(0))

    render(<CurrencyInput
      numero={numero}
      onChange={setNumero}
      />);
    const textElement = screen.getByRole('textbox');
    
    fireEvent.change(textElement,{target: {value:'1200,1'}});
    fireEvent.blur(textElement)
    expect(textElement).toHaveValue('1.200,10')
    fireEvent.focus(textElement)
    expect(textElement).toHaveValue('1200,1')
    
  }) 

  test('deverá lancar um erro se o valor for maior que o maximo',()=>{
    const {result:{current:[numero,setNumero]}} = renderHook(()=> useState(0))

    const {rerender} = render(<CurrencyInput
      numero={numero}
      onChange={setNumero}
      maxValue={50}
      onOverFlow={()=>{rerender(<CurrencyInput
        numero={numero}
        onChange={setNumero}
        maxValue={50}
        onOverFlow={()=>{}}
        error={true}
      />)}}
      error={false}
    />);
    const textElement = screen.getByRole("textbox");
    fireEvent.change(textElement,{target: {value:'120,1'}});
    screen.debug(textElement)
    expect(textElement).toHaveAttribute('aria-invalid','true');
  })

  test('deverá parar de alterar o texto antes do maximo valor',async ()=>{
    render(<App />);
    const textElement = screen.getByRole("textbox");
    fireEvent.change(textElement,{target: {value:'1'}});
    fireEvent.change(textElement,{target: {value:'12'}});
    fireEvent.change(textElement,{target: {value:'123'}});
    fireEvent.change(textElement,{target: {value:'1234'}});
    fireEvent.change(textElement,{target: {value:'12345'}});
    fireEvent.change(textElement,{target: {value:'123456'}});
    fireEvent.change(textElement,{target: {value:'1234567'}});
    
    screen.debug(textElement)
    expect(textElement).toHaveValue("12345");
  })

});
