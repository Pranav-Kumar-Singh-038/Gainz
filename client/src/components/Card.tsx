import type { LucideIcon } from 'lucide-react';

type MenuItemProps = {
    itemName: string,
    onClick?: () => void,
    icon?: LucideIcon,
};


function Card({ itemName, onClick, icon: Icon }: MenuItemProps) {

    return (
        <button onClick={onClick} className=" flex justify-start pl-6 p-4 my-6 mx-6  rounded-md bg-zinc-800 hover:bg-zinc-700">
            {Icon && <Icon className="text-white pr-2 size-7"></Icon>}
            <div className=" items-center flex text-white text-l font-normal">{itemName}</div>
        </button>
    )
}

export default Card;