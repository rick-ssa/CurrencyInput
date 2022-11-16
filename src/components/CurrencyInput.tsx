/** COMPONENTE PARA TRATAR VALOR DE MOEDA    */
/** Autor: Ricardo Santos da Silva */

/** passar um state numerico na props numero */
/** e o setState para a props onChange */

import { InputAdornment, TextField } from '@material-ui/core'
import React, { useState } from 'react'

// interface para o props do componente
interface IPropsCurrencyInput {
    numero:number,
    onChange:any,
    label?:string,
    moeda?:string,
    fullWidth?:boolean,
    autoFocus?:boolean,
    disabled?:boolean,
    inputRef?:React.Ref<any>,
    color?: "primary" | "secondary",
    variant?: "filled" | "outlined" | "standard",
}

const CurrencyInput = ({
    numero, 
    label="",
    moeda="R$", 
    fullWidth=false, 
    onChange,
    autoFocus=false,
    disabled=false,
    inputRef = undefined,
    color = "primary",
    variant = "standard"
}:IPropsCurrencyInput) => {
    // valor em texto que sera exibido para o usuario
    const [textValue, setTextValue] = useState<string>( 
        formatarTextoMoeda(parseNumberToText(numero)))

    // muda o valor tanto da variavel numero quando do textvalue
    // devolve uma funçao como parametro do onChange
    // a funcao devolvida devera ser inserida no setState da props numero no componente pai
    const handleChangeValue = (event:any) => {
        // valida se é um número
        if(/^[\d]+(,\d{0,2})?$/.test(event.target.value)) {
            onChange(()=>{
                setTextValue(event.target.value)
                return parseTextToNumber(event.target.value)
            })
        // tratamento para string vazia
        } else if(event.target.value === '') {
            onChange(()=>{
                setTextValue(event.target.value)
                return 0
            })
        }
    }

    // formata o texto ao campo perder o foco
    const handleBlur = () => {
        setTextValue(formatarTextoMoeda(textValue))
    }

    // retira os pontos caso o campo receba o foco
    const handleFocus = () => {
        setTextValue(parseNumberToText(parseTextToNumber(textValue)))
    }

    return (
        <TextField
            color={color}
            variant={variant}
            label={label}
            value={textValue}
            onChange = {handleChangeValue}
            onBlur = {handleBlur}
            onFocus = {handleFocus}
            fullWidth = {fullWidth}
            autoFocus ={autoFocus}
            disabled = {disabled}
            inputRef = {inputRef}
            InputProps = {{
            startAdornment: (
                <InputAdornment position="start">
                    {/** mostra o simbolo da moeda no início do campo*/}
                    {moeda}
                </InputAdornment>
            ),
            }}
        />
    )
}


// funcoes auxiliares **************************************************************

// funçao que transforma o texto em número
const parseTextToNumber = (textValue:string) => {
    if(textValue === '') return 0
    return Number(textValue.replace(/\./g,'').replace(',','.'))
}

// funcao que transforma o número em texto
const parseNumberToText = (value:number) => {
    return value.toString().replace(',','').replace('.',',')
}

// funçao para formatar o valor com pontos e quantidade de digitos corretos nos centavos
const formatarTextoMoeda = (textValue:string) => {
    // passa o valor de texto para numerico 
    const valor = parseTextToNumber(textValue)

    // guarda aparte inteira do valor
    const inteiro = Math.floor(valor)

    // guarda o valor dos centavos em inteiro de 1 a 99
    const centavos = Math.round((valor - inteiro) * 100)

    // transforma em texto e insere os pontos separadores de milhar
    const inteiroText = inteiro.toString()
        .split('')
        .reverse()
        .reduce((prev:string,text:string,index:number)=>{
            return (index + 1) % 3 === 0 ? prev+=text + '.' : prev += text
        },'')
        .split('').reverse().join('')

    // converte os centavos para texto
    const centavosText = ',' + insertZeros(centavos)
    
    // retorna o valor formatado tirando o ponto inicial caso haja
    return inteiroText[0] === '.' ? inteiroText.substring(1) + centavosText : 
        inteiroText + centavosText
}

// funcao para inserir a quantidade de zeros nos centavos quando preciso
// retorna o valor em texto
const insertZeros = (centavos:number) => {
    if(centavos === 0) return '00'
    return centavos < 10 ? '0' + centavos : centavos.toString()
}

export default CurrencyInput