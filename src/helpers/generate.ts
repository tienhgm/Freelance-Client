import dayjs from 'dayjs';
var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);
export const convertDateToString = (value: any) => {
    return value.toLocaleDateString("en-Us")
}
export const formatDate = (value: any) => {
    return dayjs(value).format('DD/MM/YYYY');
}
export const formatDateMonth = (value: any) => {
    return dayjs(value).format('MMMM D, YYYY');
}

export const timeFromNow = (value: any) => {
    // @ts-ignore
    return dayjs(value).fromNow();
}
export const getGender = (value: number) => {
    switch (value) {
        case 1:
            return 'Other';
        case 2:
            return 'Female';
        case 3:
            return 'Male';
    }
}
export const subContent = (value: string) => {
    let copyVal = value
    let subLast = copyVal.slice(-3);
    let finalString = copyVal.substring(0, 10) + '...' + subLast;
    return value.length > 20 ? finalString : value;
}