export default class Term {
    constructor(term) {
        this.setId = term !== undefined && term.setId !== undefined && term.setId !== null 
            ? term.setId 
            : null;

        this.left = term !== undefined && term.left !== undefined && term.left !== null 
            ? term.left 
            : '';

        this.right = term !== undefined && term.right !== undefined && term.right !== null 
        ? term.right 
        : '';
        
        this.leftNotes = term !== undefined && term.leftNotes !== undefined && term.leftNotes !== null 
            ? term.leftNotes 
            : '';
            
        this.rightNotes = term !== undefined && term.rightNotes !== undefined && term.rightNotes !== null 
        ? term.rightNotes 
        : '';

        this.severity = term !== undefined && term.severity !== undefined && term.severity !== null 
            ? term.severity 
            : 0;
    }
}