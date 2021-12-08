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
export const getWorkingStatus = (value: string) => {
    switch (value) {
        case 'Remove':
            return '#FF0000';
        case 'Working':
            return '#108ee9';
        case 'Done':
            return '#87d068';
    }
}
export const getPathKey = (value: any) => {
    switch (value) {
        case 'message':
            return '4';
        case undefined:
            return '1';
        case 'my-jobs':
            return '2';
        case 'reviews':
            return '5';
        case 'settings':
            return '6';
        case 'password':
            return '7';
        case 'setting-company':
            return '8';
        case 'jobs-manage':
            return '9';
        case 'post-jobs':
            return '10';
    }
}