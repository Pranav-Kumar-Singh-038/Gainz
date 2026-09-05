import {Dumbbell} from 'lucide-react'

type MenuItemProps={
    itemName:string,
    onClick?:()=>void
};

function MenuItem({ itemName,onClick }: MenuItemProps) {
    return (
        <button onClick={onClick} className="w-full flex justify-start pl-2 p-2  rounded-md hover:bg-zinc-800">
            <Dumbbell className="text-white pr-2 size-7"></Dumbbell>
            <div className=" items-center flex text-white tracking-wider text-l font-bold">{itemName}</div>
        </button>
    )
}

export default MenuItem;