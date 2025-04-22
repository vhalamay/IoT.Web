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
const dashboard = 'dashboard';

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
export function Link_Device_Sessions(deviceId) {
    deviceId ??= ':id';
    return `/${devices}/${deviceId}/${sessions}`;
}

// Sessions
export function Link_Sessions() {
    return `/${sessions}`;
}

export function Link_Session_Dashboard(sessionId){
    sessionId ??= ':id';
    return `/${sessions}/${sessionId}/${dashboard}`;
}

// API

// Identity
export function Api_Identity_Login() {
    return `${api}/${identity}/${login}`;
}

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
export function Api_Devices_Sessions(id) {
    return `${api}/${devices}/${id}/${sessions}`;
}

// Sessions
export function Api_Sessions() {
    return `${api}/${sessions}`;
}
export function Api_Session_Dashboard(id) {
    return `${api}/${sessions}/${id}/${dashboard}`;
}
