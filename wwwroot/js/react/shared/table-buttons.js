const classes = 'l-btn l-'

export function TermsClass(count) {
    let termsClass = classes;

    if(count === 0){
        termsClass += 'red'
    } 
    else {
        termsClass += 'blue'
    }

    return termsClass;
}

export function SetsClass(count) {
    let setsClass = classes;

    if(count === 0){
        setsClass += 'red'
    } 
    else if(count === 1){
        setsClass += 'yellow'
    }
    else {
        setsClass += 'blue'
    }

    return setsClass;
}

export function FoldersClass(count) {
    let foldersClass = classes;

    if(count === 1){
        foldersClass += 'yellow'
    } 
    else {
        foldersClass += 'blue'
    }

    return foldersClass;
}

export function UsersClass(count) {
    let usersClass = classes;

    if(count === 1){
        usersClass += 'blue'
    } 
    else {
        usersClass += 'yellow'
    }

    return usersClass;
}
