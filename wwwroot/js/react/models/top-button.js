export default class TopButton {
    constructor(title, href, onClick, className) {
        this.title = title !== undefined ? title : '. . .';
        this.href = href !== undefined ? href : null;
        this.onClick = onClick !== undefined ? onClick : null;
        this.className = className !== undefined ? className : null;
    }
}