import { statusApply } from "utils/enum"
import { jobProgress } from "utils/enum"

export const handleGetStatusEarning = (value: number) => {
    switch (value) {
        case statusApply.Waiting:
            return "Waiting";
        case statusApply.Approved:
            return "Approved";
        case statusApply.Rejected:
            return "Rejected";
        default:
            return "";
    }
}
export const handleGetJobProgress = (value: number) => {
    switch (value) {
        case jobProgress.InProgress:
            return "In Progress";
        case jobProgress.Pending:
            return "Pending";
        case jobProgress.Doned:
            return "Doned";
        case jobProgress.Cancel:
            return "Cancel";
        default:
            return "";
    }
}