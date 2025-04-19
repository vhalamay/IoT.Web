export default class Folder {
    constructor(folder) {
        this.name = folder !== undefined && folder.name !== undefined ? folder.name : '';
        this.description = folder !== undefined && folder.description !== undefined && folder.description !== null 
            ? folder.description 
            : '';
        this.favorite = folder !== undefined && folder.favorite !== undefined ? folder.favorite : false;
        this.toDo = folder !== undefined && folder.toDo !== undefined ? folder.toDo : false;
    }
}