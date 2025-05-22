// components/FloatingInput.tsx
import './FloatingInput.css';

type FloatingInputProps = {
  readonly label: string;
  readonly type: 'text' | 'number' | 'date' | 'password' | 'email' ;
  readonly name: string;
  readonly value: string;
  readonly onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function FloatingInput({ label, type, name, value, onChange }: FloatingInputProps) {
  const virgulaPonto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === 'number') {
      const convertedValue = e.target.value.replace(',', '.');
      const newEvent = {
        ...e,
        target: {
          ...e.target,
          value: convertedValue,
        },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(newEvent);
    } else {
      onChange(e);
    }
  };
  return (
    <div className="floating-input-group">
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={virgulaPonto}
        required
        className={`floating-input ${type === 'number' ? 'numeric' : ''}`}
        //autocomplete on melhora a experiência do usuário quando se trata de emails 
        autoComplete={type === 'email' ? 'email' : 'off'}
        placeholder=" "
        step="any" // permite decimais
        inputMode={type === 'number' ? 'decimal' : undefined}
      />
      <label htmlFor={name} className="floating-label">
        {label}
      </label>
    </div>
  );
}
