import React, { type CSSProperties } from 'react';

interface InputProps<T> {
  id: string;
  label?: string;
  value?: T;
  type: 'number' | 'text' | 'range';
  children?: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  [key: string]: any;
  onChange?: (value: T) => void | undefined;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void | undefined;
}

export const Input = <T extends string | number>({
  id,
  type = 'number',
  label,
  value,
  className,
  style = {},
  children,
  onChange,
  onKeyDown,
  ...rest
}: InputProps<T>) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const newValue = event.target.value as T;
    if (onChange) {
      onChange(newValue);
    }
  };

  let inputClasses;
  if (type === 'text') {
    inputClasses = 'flex-1 w-full py-2 px-4';
  } else if (type === 'range') {
    inputClasses = 'w-full';
  } else {
    inputClasses = 'text-xs w-8 text-center h-5';
  }

  return (
    <div className={`${className} w-full`}>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        type={type}
        value={value}
        aria-labelledby={label ? id : undefined}
        autoComplete="off"
        className={`${inputClasses} focus:outline-none`}
        style={style}
        onKeyDown={onKeyDown}
        onChange={handleChange}
        {...rest}
      >
        {children}
      </input>
    </div>
  );
};
