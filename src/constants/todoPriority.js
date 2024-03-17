export default {
    lowest: 1,
    low: 2,
    medium: 3,
    high: 4,
    critical: 5,
    getAll: () => {
        return [
            {value: 1, label: "Lowest"},
            {value: 2, label: "Low"},
            {value: 3, label: "Medium"},
            {value: 4, label: "High"},
            {value: 5, label: "Critical"}
        ]
    },
    getLabel: (value) => {
        let label = "Medium";
        switch (value) {
            case 1:
                label = "Lowest";
                break;
            case 2:
                label = "Low";
                break;
            case 3:
                label = "Medium";
                break;
            case 4:
                label = "High";
                break;
            case 5:
                label = "Critical";
                break;
            default:
                break;
        }

        return label;
    },
    getColor: (value) => {
        let color = "info";
        switch (value) {
            case 1:
                color = "secondary";
                break;
            case 2:
                color = "success";
                break;
            case 3:
                color = "info";
                break;
            case 4:
                color = "warning";
                break;
            case 5:
                color = "danger";
                break;
            default:
                break;
        }

        return color;
    }
}