const api = '/api';

const devices = 'devices';
const sessions = 'sessions';
const images = 'images';
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

export function Link_Device_Dashboard(deviceId){
    deviceId ??= ':id';
    return `/${devices}/${deviceId}/${dashboard}`;
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
export function Link_Session_Images(sessionId){
    sessionId ??= ':id';
    return `/${sessions}/${sessionId}/${images}`;
}

// API

// Identity
export function Api_Identity_Login() {
    return `${api}/${identity}/${login}`;
}

// Dashboard
export function Api_Dashboard_SessionActivity() {
    return `${api}/${dashboard}/session-activity`;
}

export function Api_Dashboard_DeviceSessionActivity(id) {
    return `${Api_Dashboard_SessionActivity()}/${id}`;
}

export function Api_Dashboard_ActivityTypes() {
    return `${api}/${dashboard}/activity-types`;
}

export function Api_Dashboard_ActivityTypes_Session(sessionId) {
    return `${api}/${dashboard}/activity-types/${sessions}/${sessionId}`;
}

export function Api_Dashboard_ActivityTypes_Device(deviceId) {
    return `${api}/${dashboard}/activity-types/${devices}/${deviceId}`;
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
export function Api_Session_Images(id) {
    return `${api}/${sessions}/${id}/${images}`;
}
