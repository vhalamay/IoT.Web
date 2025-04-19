export default class TextHrefItem {
    constructor(text, href, count) {
        this.text = text !== undefined ? text : '. . .';
        this.href = href !== undefined ? href : null;
        this.count = count !== undefined ? count : null;
    }
}