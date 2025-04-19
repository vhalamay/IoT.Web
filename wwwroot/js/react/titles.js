const separator = ' - ';

const home = 'Home';
const devices = 'Devices';

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

// Devices
export function SetTitle_Devices() {
    setTitle(devices);
}
