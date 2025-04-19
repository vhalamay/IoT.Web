export default class Set {
    constructor(set) {
        this.name = set !== undefined && set.name !== undefined ? set.name : '';
        
        this.alias = set !== undefined && set.alias !== undefined ? set.alias : '';

        this.description = set !== undefined && set.description !== undefined && set.description !== null 
            ? set.description 
            : '';

        this.type = set !== undefined && set.type !== undefined ? set.type : 0
        this.active = set !== undefined && set.active !== undefined ? set.active : true
        this.favorite = set !== undefined && set.favorite !== undefined ? set.favorite : false;;
        this.toDo = set !== undefined && set.toDo !== undefined ? set.toDo : false;

        this.left = set !== undefined && set.left !== undefined && set.left !== null 
            ? set.left 
            : '';
        this.right = set !== undefined && set.right !== undefined && set.right !== null 
            ? set.right 
            : '';

        this.folderId = set !== undefined && set.folderId !== undefined && set.folderId !== null 
            ? set.folderId 
            : null;
    }
}