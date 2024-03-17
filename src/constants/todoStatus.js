export default {
    pending: 1,
    inProgress: 2,
    completed: 3,
    failed: 4,
    getAll: () => {
        return [
            {value: 1, label: "Pending"},
            {value: 2, label: "In Progress"},
            {value: 3, label: "Completed"},
            {value: 4, label: "Failed"},
        ]
    },
    getLabel: (value) => {
        let label = "Pending";
        switch (value) {
            case 1:
                label = "Pending";
                break;
            case 2:
                label = "In Progress";
                break;
            case 3:
                label = "Completed";
                break;
            case 4:
                label = "Failed";
                break;
            default:
                break;
        }

        return label;
    },
    getColor: (value) => {
        let color = "secondary";
        switch (value) {
            case 1:
                color = "secondary";
                break;
            case 2:
                color = "primary";
                break;
            case 3:
                color = "success";
                break;
            case 4:
                color = "danger";
                break;
            default:
                break;
        }

        return color;
    }
}