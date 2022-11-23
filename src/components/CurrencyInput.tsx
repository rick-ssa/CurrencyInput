/** COMPONENTE PARA TRATAR VALOR DE MOEDA    */
/** Autor: Ricardo Santos da Silva */

/** passar um state numerico na props numero */
/** e o setState para a props onChange */

import { InputAdornment, TextField } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";

// interface para o props do componente
interface IPropsCurrencyInput {
  numero: number;
  onChange: any;
  label?: string;
  symbolStart?: string;
  symbolEnd?: string;
  fullWidth?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
  inputRef?: React.Ref<any>;
  maxValue?: number;
  color?: "primary" | "secondary";
  variant?: "filled" | "outlined" | "standard";
  onOverFlow?: any;
  helperText?: React.ReactNode;
  error?: boolean;
}

const CurrencyInput = ({
  numero,
  label = "",
  symbolStart = "",
  symbolEnd = "",
  fullWidth = false,
  onChange,
  autoFocus = false,
  disabled = false,
  inputRef = undefined,
  color = "primary",
  variant = "standard",
  maxValue = 999999999999999.99,
  onOverFlow = undefined,
  helperText = "",
  error = false,
}: IPropsCurrencyInput) => {
  // valor em texto que sera exibido para o usuario
  const [textValue, setTextValue] = useState<string>(
    formatarTextoMoeda(
      autoFocus
        ? parseNumberToText(numero)
        : formatarTextoMoeda(parseNumberToText(numero))
    )
  );

  const centsComZerosInsignificantes = useRef<boolean>(false);

  useEffect(() => {
    setTextValue(parseNumberToText(numero));
  }, [numero]);

  // muda o valor tanto da variavel numero quando do textvalue
  // devolve uma funçao como parametro do onChange
  // a funcao devolvida devera ser inserida no setState da props numero no componente pai
  const handleChangeValue = (event: any) => {
    // valida se é um número
    if (/^[\d]+(,\d{0,2})?$/.test(event.target.value)) {
      // verifica se o ultimo caracter é uma virgula
      if (/(,0{0,2}|,\d0)$/.test(event.target.value)) {
        centsComZerosInsignificantes.current = true;
        setTextValue(event.target.value);
      } else {
        centsComZerosInsignificantes.current = false;

        // transforma texto em numero
        const value = parseTextToNumber(event.target.value);
        // dispara o evento onOverFlow quando ultrapassa o valor máximo
        if (value > maxValue) {
          if (typeof onOverFlow === "function") {
            onOverFlow({
              valorDecimal: formatarTextoMoeda(event.target.value),
              valorNumerico: value,
            });
            return;
          }
        }

        // altera o valor no campo quando o último caracter do centavo é 0
        // e o backspace foi pressionado ex: 25,20
        if(numero === value) {
            setTextValue(parseNumberToText(numero))
        }
        // chama o evento onChange
        onChange(value);
      }

      // tratamento para string vazia
    } else if (event.target.value === "") {
      onChange(0);
    }
  };

  // formata o texto ao campo perder o foco
  const handleBlur = () => {
    setTextValue(formatarTextoMoeda(textValue));
  };

  // retira os pontos caso o campo receba o foco
  const handleFocus = () => {
    setTextValue(parseNumberToText(parseTextToNumber(textValue)));
  };

  return (
    <TextField
      color={color}
      variant={variant}
      label={label}
      value={textValue === "0" ? "" : textValue}
      onChange={handleChangeValue}
      onBlur={handleBlur}
      onFocus={handleFocus}
      fullWidth={fullWidth}
      autoFocus={autoFocus}
      disabled={disabled}
      inputRef={inputRef}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            {/** mostra o simbolo no início do campo*/}
            {symbolStart}
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">{symbolEnd}</InputAdornment>
        ),
      }}
      helperText={helperText}
      error={error}
    />
  );
};

// funcoes auxiliares **************************************************************

// funçao que transforma o texto em número
const parseTextToNumber = (textValue: string) => {
  if (textValue === "") return 0;
  return Number(textValue.replace(/\./g, "").replace(",", "."));
};

// funcao que transforma o número em texto
const parseNumberToText = (value: number) => {
    console.log(value)
    console.log(value.toString())
  return value.toString().replace(",", "").replace(".", ",");
};

// funçao para formatar o valor com pontos e quantidade de digitos corretos nos centavos
const formatarTextoMoeda = (textValue: string) => {
  // passa o valor de texto para numerico
  const valor = parseTextToNumber(textValue);

  // guarda aparte inteira do valor
  const inteiro = Math.floor(valor);

  // guarda o valor dos centavos em inteiro de 1 a 99
  const centavos = Math.round((valor - inteiro) * 100);

  // transforma em texto e insere os pontos separadores de milhar
  const inteiroText = inteiro
    .toString()
    .split("")
    .reverse()
    .reduce((prev: string, text: string, index: number) => {
      return (index + 1) % 3 === 0 ? (prev += text + ".") : (prev += text);
    }, "")
    .split("")
    .reverse()
    .join("");

  // converte os centavos para texto
  const centavosText = "," + insertZeros(centavos);

  // retorna o valor formatado tirando o ponto inicial caso haja
  return inteiroText[0] === "."
    ? inteiroText.substring(1) + centavosText
    : inteiroText + centavosText;
};

// funcao para inserir a quantidade de zeros nos centavos quando preciso
// retorna o valor em texto
const insertZeros = (centavos: number) => {
  if (centavos === 0) return "00";
  return centavos < 10 ? "0" + centavos : centavos.toString();
};

export default CurrencyInput;
