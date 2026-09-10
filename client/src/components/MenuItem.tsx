import type {LucideIcon} from 'lucide-react';

type MenuItemProps={
    itemName:string,
    icon: LucideIcon,
    onClick?:()=>void
};

function MenuItem({ itemName,onClick, icon: Icon }: MenuItemProps) {
    return (
        <button onClick={onClick} className="w-full flex justify-start pl-2 p-2  rounded-md hover:bg-zinc-800">
            {Icon && <Icon className="text-white pr-2 size-7"></Icon>}
            <div className=" items-center flex text-white tracking-wider text-l font-bold">{itemName}</div>
        </button>
    )
}

export default MenuItem;