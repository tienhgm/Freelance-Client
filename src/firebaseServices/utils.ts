// @ts-nocheck 
import { UserType } from "types/userType";

export const mergeList = (partnerList: DocumentData[], roomList: DocumentData[], filter: string) => {
    let newList = [];
    roomList.forEach((room: { user: { id: any; }[] }) => {
        const partner = partnerList.find((partner: UserType) => {
            return partner.name.toLowerCase().indexOf(filter.toLowerCase()) > -1
                && (partner.id === room.user[0].id
                    || partner.id === room.user[1].id)

        })
        if (partner) {
            newList.push({
                ...partner,
                lastMsg: room.lastMsg,
                lastMsgTime: room.lastMsgTime,
                lastMsgBy: room.lastMsgBy
            });
        }
    });

    return newList;
};
