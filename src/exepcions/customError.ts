export default class CustomError extends Error {
    public details: string[];
    constructor(message: string, details: string[] = []) {
        super(message);
        this.details = details;
    }
}
