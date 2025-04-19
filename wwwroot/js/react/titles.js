const separator = ' - ';

const home = 'Home';
const folders = 'Folders';
const folder = 'Folder';
const sets = 'Sets';
const set = 'Set';
const term = 'Term';
const test = 'Test';

const create = 'Create';
const clone = 'Clone';
const learn = 'Learn';

function setTitle(title){
    document.title = title + `${separator}IoT.Web`;
}

// General
export function SetTitle_Act(actionName) {
    setTitle(actionName);
}


export default function SetTitle_Home() {
    setTitle(home);
}

// Folders
export function SetTitle_Folders() {
    setTitle(folders);
}

export function SetTitle_Folder_Create() {
    setTitle(`${folder}${separator}${create}`);
}

export function SetTitle_Folder_Clone(folderName) {
    SetTitle_Folder_Act(folderName, clone);
}

export function SetTitle_Folder_Act(folderName, actionName) {
    setTitle(`${folder}${separator}${folderName}${separator}${actionName}`);
}

// Sessions
export function SetTitle_Learn(setName) {
    setTitle(`${learn}${separator}${setName}`);
}

// Sets
export function SetTitle_Sets() {
    setTitle(sets);
}

export function SetTitle_Set_Create() {
    setTitle(`${set}${separator}${create}`);
}

export function SetTitle_Set_Clone(setName) {
    SetTitle_Set_Act(setName, clone);
}

export function SetTitle_Set_Act(setName, actionName) {
    setTitle(`${set}${separator}${setName}${separator}${actionName}`);
}

//Terms
export function SetTitle_Term_Act(actionName) {
    setTitle(`${term}${separator}${actionName}`);
}

// Tests
export function SetTitle_Test_Act(actionName) {
    setTitle(`${test}${separator}${actionName}`);
}