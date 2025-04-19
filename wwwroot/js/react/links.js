const api = '/api';

const devices = 'devices';
const sessions = 'sessions';
const users = 'users';
const lookup = 'lookup';
const widgets = 'widgets';

const create = 'create';
const edit = 'edit';
const start = 'start';
const finish = 'finish';

const identity = 'identity';
const account = 'account';
const login = 'login';

// Identity
export function Link_Identity_Login() {
    return `/${identity}/${account}/${login}`;
}

// Devices
export function Link_Devices() {
    return `/${devices}`;
}
export function Link_Device_Edit() {
    return `/${devices}/${edit}`;
}

// API
// Devices
export function Api_Devices() {
    return `${api}/${devices}`;
}

export function Api_Devices_Start(id) {
    return `${api}/${devices}/${id}/${start}`;
}
export function Api_Devices_Finish(id) {
    return `${api}/${devices}/${id}/${finish}`;
}