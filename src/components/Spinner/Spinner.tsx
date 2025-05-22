// components/Spinner.tsx
import './Spinner.css';

type SpinnerProps = {
  readonly type?: 'rodando' | 'empoleia' | 'corredor';
  readonly size?: 'pequeno' | 'medio' | 'grande';
  readonly colorClass?: 'azul' | 'verde' | 'laranja';
  readonly blockScreen?: boolean;
};
/*
Esse trecho de código em TypeScript define um **componente React chamado `Spinner`**, 
utilizado para exibir um **indicador de carregamento** visual em uma interface. Ele recebe algumas 
propriedades (props) que controlam sua aparência e comportamento:

- `type`: define o estilo da animação do spinner (padrão é `'rodando'`).
- `size`: controla o tamanho do spinner, com valor padrão `'medio'`.
- `colorClass`: define a cor do spinner via classes CSS, com valor padrão `'azul'`.
- `blockScreen`: um booleano que, quando `true`, indica que o spinner deve cobrir a tela 
inteira com um fundo sobreposto (overlay), útil para impedir interação com a interface durante carregamentos.

Dentro do componente, é criado um elemento `div` com várias **classes CSS dinâmicas**, que são construídas 
a partir das props passadas:  
`spinner`, `spinner-${type}`, `spinner-${size}`, e `spinner-color-${colorClass}`. 
Essas classes permitem aplicar estilos específicos definidos no CSS, como a animação, o tamanho e a cor do spinner. 
A propriedade `aria-label="Carregando..."` torna o componente mais acessível, permitindo que leitores de 
tela o reconheçam como um indicador de carregamento.

Se a propriedade `blockScreen` estiver ativada, o spinner é envolvido em uma `div` com a classe `spinner-overlay`, 
que provavelmente aplica um fundo semi-transparente cobrindo toda a tela, centralizando o spinner e impedindo 
a interação com o restante da interface. Caso contrário, o componente renderiza apenas o spinner simples.

Esse padrão é bastante comum em aplicações para indicar ao usuário que uma operação assíncrona está em andamento.

*/
export function Spinner({
  type = 'rodando',
  size = 'medio',
  colorClass = 'azul',
  blockScreen = false,
}: SpinnerProps) {
  const spinnerElement = (
    <div
      className={`spinner spinner-${type} spinner-${size} spinner-color-${colorClass}`}
      aria-label="Carregando..."
    />
  );

  if (blockScreen) {
    return (
      <div className="spinner-overlay">
        {spinnerElement}
      </div>
    );
  }

  return spinnerElement;
}
