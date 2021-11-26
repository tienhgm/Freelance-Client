import dayjs from 'dayjs';
var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);
export const convertDateToString = (value: any) => {
    return value.toLocaleDateString("en-Us")
}
export const formatDate = (value: any) => {
    return dayjs(value).format('DD/MM/YYYY');
}
export const timeFromNow = (value: any) => {
    // @ts-ignore
    return dayjs(value).fromNow();
}