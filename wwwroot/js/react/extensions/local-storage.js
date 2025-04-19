export function GetFromStorage(key, valueIfNull = null){
    let value = localStorage.getItem(key);
    return value === null ? valueIfNull : value;
}

export function SetToStorage(key, value){
    if(value === ''){
        localStorage.removeItem(key);
    } else{
        localStorage.setItem(key, value);
    }
}