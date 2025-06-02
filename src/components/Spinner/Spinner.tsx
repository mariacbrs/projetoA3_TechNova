// components/Spinner.tsx
import './Spinner.css';

type SpinnerProps = {
  readonly type?: 'rodando' | 'empoleia';
  readonly size?: 'medio';
  readonly colorClass?: 'purple';
  readonly blockScreen?: boolean;
};

export function Spinner({
  type = 'empoleia',
  size = 'medio',
  colorClass = 'purple',
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
