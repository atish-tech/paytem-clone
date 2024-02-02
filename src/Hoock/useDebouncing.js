const { useState, useEffect } = require("react")

export const useDebouncing = (inputValue) => {
    const [value , setValue] = useState();

    useEffect(() => {
        const timeOut = setTimeout(() => {
            setValue(inputValue)
            console.log(inputValue);
        } , 800)

        return()=> {
            clearTimeout(timeOut);   
        }

    } , [inputValue]);

    return value;

}