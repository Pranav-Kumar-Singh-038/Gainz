import type { ComponentPropsWithoutRef } from 'react';

type InputProps = ComponentPropsWithoutRef<'input'> & {
    label?: string;
};


function Input({ label, className = '', id, ...props }: InputProps) {
    return (
        <div>
            {label && (
                <label
                    htmlFor={id}
                    className="block text-white tracking-wider text-xl font-semibold pl-1"
                >
                    {label}
                </label>
            )}
            <input
                id={id}
                className={`rounded-md bg-zinc-800 px-4 py-3 text-white placeholder-zinc-500 outline-none focus:ring-2 focus:ring-zinc-500 ${className}`}
                {...props}
                
            />
        </div>
    )
}

export default Input;