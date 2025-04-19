export default class Learn {
    constructor(learn) {
        this.iterations = learn !== undefined && learn.iterations !== undefined && learn.iterations !== null 
            ? learn.iterations 
            : 1;

        this.variants = learn !== undefined && learn.variants !== undefined && learn.variants !== null 
            ? learn.variants 
            : 4;

        this.questions = learn !== undefined && learn.questions !== undefined && learn.questions !== null 
            ? learn.questions 
            : 30;

        this.termType = learn !== undefined && learn.termType !== undefined && learn.termType !== null 
            ? learn.termType 
            : null;

        this.progress = learn !== undefined && learn.progress !== undefined && learn.progress !== null 
            ? learn.progress 
            : null;

        this.lastRun = learn !== undefined && learn.lastRun !== undefined && learn.lastRun !== null 
            ? learn.lastRun 
            : null;

        this.lastFailed = learn !== undefined && learn.lastFailed !== undefined && learn.lastFailed !== null 
            ? learn.lastFailed 
            : null;

        this.severity = learn !== undefined && learn.severity !== undefined && learn.severity !== null 
            ? learn.severity 
            : null;
    }
}