export default class TestCase {

    constructor(id, name, content, notes, hasDelete, isCorrect) {
        this.id = id;
        this.name = name;
        this.content = content === null ? "" : content;
        this.notes = notes === null ? "" : notes;
        this.hasDelete = hasDelete;
        this.isCorrect = isCorrect;
    }
}