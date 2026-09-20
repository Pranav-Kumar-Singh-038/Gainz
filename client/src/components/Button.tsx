import type {LucideIcon} from 'lucide-react';

type ButtonProps={
    itemName:string,
    icon?: LucideIcon,
    onClick?:()=>void
};

function Button({ itemName,onClick, icon: Icon }: ButtonProps) {
    return (
        <button onClick={onClick} className=" flex justify-start pl-2 p-2  rounded-md bg-zinc-600 hover:bg-zinc-500">
            {Icon && <Icon className="text-white pr-2 size-7"></Icon>}
            <div className=" text-white tracking-wider text-2xl font-semibold">{itemName}</div>
        </button>
    )
}

export default Button;