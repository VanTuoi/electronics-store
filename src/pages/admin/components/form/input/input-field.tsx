import React, { FC } from "react";

interface InputProps {
    label?: string;
    type?: "text" | "number" | "email" | "password" | "date" | "time" | string;
    id?: string;
    name?: string;
    placeholder?: string;
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    className?: string;
    min?: string | number;
    max?: string | number;
    step?: number;
    disabled?: boolean;
    success?: boolean;
    error?: string;
    hint?: string;
    row?: number;
}

const Input: FC<InputProps> = ({
    label,
    type = "text",
    id,
    name,
    placeholder,
    value,
    onChange,
    className = "",
    min,
    max,
    step,
    disabled = false,
    success = false,
    error,
    hint,
    row = 1,
    ...rest
}) => {
    let inputClasses = `h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 ${className}`;

    if (disabled) {
        inputClasses += ` text-gray-700 border-gray-300 opacity-90 bg-gray-100 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700 opacity-40`;
    } else if (error) {
        inputClasses += ` border-error-500 focus:border-error-300 focus:ring-error-500/20 dark:text-error-400 dark:border-error-500 dark:focus:border-error-800`;
    } else if (success) {
        inputClasses += ` border-success-500 focus:border-success-300 focus:ring-success-500/20 dark:text-success-400 dark:border-success-500 dark:focus:border-success-800`;
    } else {
        inputClasses += ` bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800`;
    }

    return (
        <div className="relative">
            {label && (
                <label htmlFor={id || name} className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">
                    {label}
                </label>
            )}
            {row && row > 1 ? (
                <textarea
                    {...rest}
                    rows={row}
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    className={inputClasses}
                />
            ) : (
                <input
                    {...rest}
                    type={type}
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    min={min}
                    max={max}
                    step={step}
                    disabled={disabled}
                    className={inputClasses}
                />
            )}
            {error ? (
                <p className="mt-1.5 text-xs text-error-500">{error}</p>
            ) : hint ? (
                <p className="mt-1.5 text-xs text-gray-500">{hint}</p>
            ) : null}
        </div>
    );
};

export default Input;
