// components/Spinner.tsx
import './Spinner.css';

type SpinnerProps = {
  readonly type?: 'rodando';
  readonly size?:  'medio';
  readonly colorClass?:  'roxo';
  readonly blockScreen?: boolean;
};

export function Spinner({
  type = 'rodando',
  size = 'medio',
  colorClass = 'roxo',
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