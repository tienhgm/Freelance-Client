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
export const getJobStatus = (value: string) => {
    switch (value) {
        case 'Cancel':
            return '#FF0000';
        case 'Done':
            return '#87d068';
        case 'Pending':
            return '#FFA500';
        case 'Await':
            return '#d3adf7';
        case 'Inprogress':
            return '#108ee9';
    }
}
export const getApplyStatus = (value: string) => {
    switch (value) {
        case 'Rejected':
            return '#FF0000';
        case 'Approved':
            return '#87d068';
        case 'Waiting':
            return '#d3adf7';
    }
}
