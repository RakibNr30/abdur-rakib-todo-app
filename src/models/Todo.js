import {uid} from "uid";

class Todo {
    constructor() {
        this.id = uid();
        this.title = "";
        this.details = "";
        this.priority = 1;
        this.status = 1;
        this.end_time = new Date().toISOString();
        this.created_at = new Date().toISOString();
        this.updated_at = new Date().toISOString();
    }
}

export default new Todo();