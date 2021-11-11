import { statusEarning } from "utils/enum"

export const handleGetStatusEarning = (value: number) => {
    switch (value) {
        case statusEarning.Waiting:
            return "Waiting";
        case statusEarning.Applied:
            return "Applied";
        case statusEarning.Pending:
            return "Pending";
        case statusEarning.Doned:
            return "Doned";
        case statusEarning.Cancel:
            return "Cancel";
        default:
            return "";
    }
}