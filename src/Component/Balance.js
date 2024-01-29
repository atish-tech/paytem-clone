
export const Balance = ({ value }) => {
    return <div className="flex bg-zinc-500 w-fit rounded-sm p-5">
        <div className="font-bold text-lg">
            Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs {value}
        </div>
    </div>
}