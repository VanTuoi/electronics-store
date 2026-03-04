import React from "react";

interface SwitchProps {
  label: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  color?: "blue" | "gray";
  name?: string;
  value?: string;
  ref?: React.Ref<HTMLInputElement>;
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      label,
      checked,
      defaultChecked = false,
      disabled = false,
      onChange,
      onBlur,
      color = "blue",
      name,
      value,
      ...props
    },
    ref
  ) => {
    const [isChecked, setIsChecked] = React.useState(defaultChecked);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      const newChecked = e.target.checked;
      setIsChecked(newChecked);
      if (onChange) {
        onChange(newChecked);
      }
    };

    const isControlled = typeof checked !== "undefined";
    const switchChecked = isControlled ? checked : isChecked;

    const switchColors =
      color === "blue"
        ? {
            background: switchChecked ? "bg-brand-500" : "bg-gray-200 dark:bg-white/10",
            knob: switchChecked ? "translate-x-full bg-white" : "translate-x-0 bg-white"
          }
        : {
            background: switchChecked ? "bg-gray-800 dark:bg-white/10" : "bg-gray-200 dark:bg-white/10",
            knob: switchChecked ? "translate-x-full bg-white" : "translate-x-0 bg-white"
          };

    return (
      <label
        className={`flex cursor-pointer select-none items-center gap-3 text-sm font-medium ${
          disabled ? "text-gray-400" : "text-gray-700 dark:text-gray-400"
        }`}
      >
        <input
          type="checkbox"
          checked={switchChecked}
          onChange={handleChange}
          onBlur={onBlur}
          disabled={disabled}
          className="sr-only"
          aria-label={label}
          name={name}
          value={value}
          ref={ref}
          {...props}
        />
        <div className="relative">
          <div
            className={`block transition duration-150 ease-linear h-6 w-11 rounded-full ${
              disabled ? "bg-gray-100 pointer-events-none dark:bg-gray-800" : switchColors.background
            }`}
          ></div>
          <div
            className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full shadow-theme-sm duration-150 ease-linear transform ${switchColors.knob}`}
          ></div>
        </div>
        {label}
      </label>
    );
  }
);

Switch.displayName = "Switch";

export default Switch;
