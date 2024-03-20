import {uid} from "uid";
import moment from "moment";
import {FORMAT} from "../constants/dates";

class Todo {
    constructor() {
        this.id = uid();
        this.title = "";
        this.details = "";
        this.priority = 1;
        this.status = 1;
        this.end_time = moment().format(FORMAT.LOCAL);
        this.created_at = moment().format(FORMAT.LOCAL)
        this.updated_at = moment().format(FORMAT.LOCAL);
    }
}

export default Todo;