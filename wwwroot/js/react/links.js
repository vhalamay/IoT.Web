const api = '/api';

const folders = 'folders';
const sets = 'sets';
const sessions = 'sessions';
const terms = 'terms';
const tests = 'tests';
const users = 'users';
const lookup = 'lookup';
const widgets = 'widgets';

const create = 'create';
const edit = 'edit';
const clone = 'clone';
const info = 'info';
const question = 'question';
const answer = 'answer';
const result = 'result';
const learn = 'learn';
const check = 'check';
const reset = 'reset';
const progress = 'progress';

const identity = 'identity';
const account = 'account';
const login = 'login';

// Identity
export function Link_Identity_Login() {
    return `/${identity}/${account}/${login}`;
}

// Folders
export function Link_Folders() {
    return `/${folders}`;
}

export function Link_Folder_Create() {
    return `/${folders}/${create}`;
}

export function Link_Folder_Edit(folderId) {
    folderId ??= ':id';
    return `/${folders}/${folderId}/${edit}`;
}

export function Link_Folder_Clone(folderId) {
    folderId ??= ':id';
    return `/${folders}/${folderId}/${clone}`;
}

export function Link_Folder_Sets(folderId) {
    folderId ??= ':id';
    return `/${folders}/${folderId}/${sets}`;
}

export function Link_Folder_Set_Create(folderId) {
    folderId ??= ':id';
    return `/${folders}/${folderId}/${sets}/${create}`;
}

export function Link_Folder_Terms(folderId) {
    folderId ??= ':id';
    return `/${folders}/${folderId}/${terms}`;
}

export function Link_Folder_Term_Edit(folderId, termId) {
    folderId ??= ':pFolderId';
    termId ??= ':pTermId';
    return `/${folders}/${folderId}/${terms}/${termId}/${edit}`;
}

export function Link_Folder_Term_Sets(folderId, termId) {
    folderId ??= ':pFolderId';
    termId ??= ':pTermId';
    return `/${folders}/${folderId}/${terms}/${termId}/${sets}`;
}

export function Link_Folder_Tests(folderId) {
    folderId ??= ':id';
    return `/${folders}/${folderId}/${tests}`;
}

export function Link_Folder_Test_Edit(folderId, testId) {
    folderId ??= ':pFolderId';
    testId ??= ':pTestId';
    return `/${folders}/${folderId}/${tests}/${testId}/${edit}`;
}

export function Link_Folder_Users(folderId) {
    folderId ??= ':id';
    return `/${folders}/${folderId}/${users}`;
}

export function Link_Folder_Learn(folderId) {
    folderId ??= ':id';
    return `/${folders}/${folderId}/${learn}`;
}

// Sessions
export function Link_Sessions() {
    return `/${sessions}`;
}

export function Link_Session_Question(sessionId) {
    sessionId ??= ':id';
    return `/${sessions}/${sessionId}/${question}`;
}

export function Link_Session_Answer(sessionId) {
    sessionId ??= ':id';
    return `/${sessions}/${sessionId}/${answer}`;
}

export function Link_Session_Result(sessionId) {
    sessionId ??= ':id';
    return `/${sessions}/${sessionId}/${result}`;
}

// Sets
export function Link_Sets() {
    return `/${sets}`;
}

export function Link_Set_Create() {
    return `/${sets}/${create}`;
}

export function Link_Set_Edit(setId) {
    setId ??= ':id';
    return `/${sets}/${setId}/${edit}`;
}

export function Link_Set_Clone(setId) {
    setId ??= ':id';
    return `/${sets}/${setId}/${clone}`;
}

export function Link_Set_Terms(setId) {
    setId ??= ':id';
    return `/${sets}/${setId}/${terms}`;
}

export function Link_Set_Term_Create(setId) {
    setId ??= ':id';
    return `/${sets}/${setId}/${terms}/${create}`;
}

export function Link_Set_Term_Edit(setId, termId) {
    setId ??= ':pSetId';
    termId ??= ':pTermId';
    return `/${sets}/${setId}/${terms}/${termId}/${edit}`;
}

export function Link_Set_Term_Clone(setId, termId) {
    setId ??= ':pSetId';
    termId ??= ':pTermId';
    return `/${sets}/${setId}/${terms}/${termId}/${clone}`;
}

export function Link_Set_Term_Sets(setId, termId) {
    setId ??= ':pSetId';
    termId ??= ':pTermId';
    return `/${sets}/${setId}/${terms}/${termId}/${sets}`;
}

export function Link_Set_Tests(setId) {
    setId ??= ':id';
    return `/${sets}/${setId}/${tests}`;
}

export function Link_Set_Test_Create(setId) {
    setId ??= ':id';
    return `/${sets}/${setId}/${tests}/${create}`;
}

export function Link_Set_Test_Edit(setId, testId) {
    setId ??= ':pSetId';
    testId ??= ':pTestId';
    return `/${sets}/${setId}/${tests}/${testId}/${edit}`;
}

export function Link_Set_Test_Clone(setId, testId) {
    setId ??= ':pSetId';
    testId ??= ':pTestId';
    return `/${sets}/${setId}/${tests}/${testId}/${clone}`;
}

export function Link_Set_Folders(setId) {
    setId ??= ':id';
    return `/${sets}/${setId}/${folders}`;
}

export function Link_Set_Learn(setId) {
    setId ??= ':id';
    return `/${sets}/${setId}/${learn}`;
}

// API -------------------------------------------------------

// Identity
export function Api_Identity_Login() {
    return `${api}/${identity}/${login}`;
}

// Folders
export function Api_Folders() {
    return `${api}/${folders}`;
}

export function Api_Folder_Create() {
    return `${api}/${folders}`;
}

export function Api_Folder_Get(folderId) {
    return `${api}/${folders}/${folderId}`;
}

export function Api_Folder_Info(folderId) {
    return `${api}/${folders}/${folderId}/${info}`;
}

export function Api_Folder_Edit(folderId) {
    return `${api}/${folders}/${folderId}`;
}

export function Api_Folder_Delete(folderId) {
    return `${api}/${folders}/${folderId}`;
}

export function Api_Folder_Learn(folderId) {
    return `${api}/${folders}/${folderId}/${learn}`;
}

export function Api_Folder_LearnCheck(folderId) {
    return `${api}/${folders}/${folderId}/${learn}/${check}`;
}

export function Api_Folder_Terms(folderId) {
    return `${api}/${folders}/${folderId}/${terms}`;
}

export function Api_Folder_Terms_Info(folderId) {
    return `${api}/${folders}/${folderId}/${terms}/${info}`;
}

export function Api_Folder_Tests(folderId) {
    return `${api}/${folders}/${folderId}/${tests}`;
}

export function Api_Folder_Tests_Info(folderId) {
    return `${api}/${folders}/${folderId}/${tests}/${info}`;
}

export function Api_Folder_Users(folderId) {
    return `${api}/${folders}/${folderId}/${users}`;
}

export function Api_Folder_Users_Add(folderId, userId) {
    return `${api}/${folders}/${folderId}/${users}/${userId}`;
}

export function Api_Folder_Users_Remove(folderId, userId) {
    return `${api}/${folders}/${folderId}/${users}/${userId}`;
}

// FolderSets
export function Api_FolderSet_Add(folderId, setId) {
    return `${api}/${folders}/${folderId}/${sets}/${setId}`;
}

export function Api_Folder_Sets(folderId) {
    return `${api}/${folders}/${folderId}/${sets}`;
}

export function Api_FolderSet_Remove(folderId, setId) {
    return `${api}/${folders}/${folderId}/${sets}/${setId}`;
}

// Sessions
export function Api_Sessions() {
    return `${api}/${sessions}`;
}

export function Api_Session_Info(sessionId) {
    return `${api}/${sessions}/${sessionId}/${info}`;
}

export function Api_Session_Info_Result(sessionId) {
    return `${api}/${sessions}/${sessionId}/${info}/${result}`;
}

export function Api_Session_Sets(sessionId) {
    return `${api}/${sessions}/${sessionId}/${sets}`;
}

export function Api_Session_Question(sessionId) {
    return `${api}/${sessions}/${sessionId}/${question}`;
}

export function Api_Session_Answer(sessionId) {
    return `${api}/${sessions}/${sessionId}/${answer}`;
}

export function Api_Session_Answer_Order(sessionId, order) {
    return `${api}/${sessions}/${sessionId}/${answer}/${order}`;
}

export function Api_Session_Delete(sessionId) {
    return `${api}/${sessions}/${sessionId}`;
}

// Sets
export function Api_Sets() {
    return `${api}/${sets}`;
}

export function Api_Set_Create() {
    return `${api}/${sets}`;
}

export function Api_Set_Edit(setId) {
    return `${api}/${sets}/${setId}`;
}

export function Api_Set_Clone(setId) {
    return `${api}/${sets}/${setId}/${clone}`;
}

export function Api_Set_Info(setId) {
    return `${api}/${sets}/${setId}/${info}`;
}

export function Api_Set_Delete(setId) {
    return `${api}/${sets}/${setId}`;
}

export function Api_Set_Folders(setId) {
    return `${api}/${sets}/${setId}/${folders}`;
}

export function Api_Set_Learn(setId) {
    return `${api}/${sets}/${setId}/${learn}`;
}

export function Api_Set_Terms(setId) {
    return `${api}/${sets}/${setId}/${terms}`;
}

export function Api_Set_Terms_Create(setId) {
    return `${api}/${sets}/${setId}/${terms}`;
}

export function Api_Set_Terms_Info(setId) {
    return `${api}/${sets}/${setId}/${terms}/${info}`;
}

export function Api_Set_Tests(setId) {
    return `${api}/${sets}/${setId}/${tests}`;
}

export function Api_Set_Tests_Create(setId) {
    return `${api}/${sets}/${setId}/${tests}`;
}

export function Api_Set_Tests_Info(setId) {
    return `${api}/${sets}/${setId}/${tests}/${info}`;
}

export function Api_Set_LearnCheck(setId) {
    return `${api}/${sets}/${setId}/${learn}/${check}`;
}

// Terms
export function Api_Term_Edit(termId) {
    return `${api}/${terms}/${termId}`;
}

export function Api_Term_Delete(termId) {
    return `${api}/${terms}/${termId}`;
}

export function Api_Term_Reset(termId) {
    return `${api}/${terms}/${termId}/${reset}`;
}

export function Api_Term_Sets(termId) {
    return `${api}/${terms}/${termId}/${sets}`;
}

export function Api_Term_Set_Add(termId, setId) {
    return `${api}/${terms}/${termId}/${sets}/${setId}`;
}

export function Api_Term_Set_Remove(termId, setId) {
    return `${api}/${terms}/${termId}/${sets}/${setId}`;
}

// Tests
export function Api_Test_Edit(testId) {
    return `${api}/${tests}/${testId}`;
}

export function Api_Test_Delete(testId) {
    return `${api}/${tests}/${testId}`;
}

export function Api_Test_Reset(testId) {
    return `${api}/${tests}/${testId}/${reset}`;
}

// Lookup
export function Api_Lookup_Folders() {
    return `${api}/${lookup}/${folders}`;
}

export function Api_Lookup_Sets() {
    return `${api}/${lookup}/${sets}`;
}

export function Api_Widgets_Progress() {
    return `${api}/${widgets}/${progress}`;
}