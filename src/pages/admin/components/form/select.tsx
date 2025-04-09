import React, { useState } from "react";

interface Option {
    value: string;
    label: string;
}

interface SelectProps {
    options: Option[];
    placeholder?: string;
    onChange?: (value: string) => void;
    onValueChange?: (value: string) => void;
    className?: string;
    defaultValue?: string;
    value?: string;
    label?: string;
    error?: string;
}

const Select: React.FC<SelectProps> = ({
    options,
    placeholder = "Select an option",
    onChange,
    onValueChange,
    className = "",
    defaultValue = "",
    value,
    label,
    error
}) => {
    // Manage the selected value
    const [selectedValue, setSelectedValue] = useState<string>(value || defaultValue);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = e.target.value;
        setSelectedValue(newValue);
        if (onChange) onChange(newValue);
        if (onValueChange) onValueChange(newValue);
    };

    return (
        <div className="relative">
            {label && <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">{label}</label>}
            <select
                className={`h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 ${
                    selectedValue ? "text-gray-800 dark:text-white/90" : "text-gray-400 dark:text-gray-400"
                } ${className}`}
                value={value || selectedValue}
                onChange={handleChange}
            >
                {/* Placeholder option */}
                <option value="" disabled className="text-gray-700 dark:bg-gray-900 dark:text-gray-400">
                    {placeholder}
                </option>
                {/* Map over options */}
                {options.map(option => (
                    <option
                        key={option.value}
                        value={option.value}
                        className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
                    >
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <p className="mt-1.5 text-xs text-error-500">{error}</p>}
        </div>
    );
};

export default Select;
