import {uid} from "uid";
import moment from "moment";

class Todo {
    FORMAT = "YYYY-MM-DDTHH:mm";

    constructor() {
        this.id = uid();
        this.title = "";
        this.details = "";
        this.priority = 1;
        this.status = 1;
        this.end_time = moment().format(this.FORMAT);
        this.created_at = moment().format(this.FORMAT);
        this.updated_at = moment().format(this.FORMAT);
    }
}

export default Todo;