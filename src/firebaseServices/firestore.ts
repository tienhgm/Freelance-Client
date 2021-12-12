import {
  collection,
  query,
  where,
  doc,
  setDoc,
  onSnapshot,
  getFirestore,
  getDoc,
  getDocs,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore';
import { UserType } from 'types/userType';
import firebase from 'firebase/compat/app';
import firebaseConfig from './firebaseConfig';

firebase.initializeApp(firebaseConfig);
const fireStore = getFirestore();

async function checkUserExist(userId: string) {
  const userRef = doc(fireStore, 'users', userId);
  const userSnap = await getDoc(userRef);
  return userSnap.exists();
}

async function createRefIfNotExist(user: UserType) {
  const userRef = doc(fireStore, 'users', user.id);
  const isProfileIsExist = await checkUserExist(user.id);
  if (!isProfileIsExist) {
    await setDoc(userRef, {
      ...user,
      partners: [],
      rooms: [],
      isAct: false,
    });
  }

}

export async function updateActState(user: UserType, isAct: boolean) {
  const userRef = doc(fireStore, 'users', user.id);
  await createRefIfNotExist(user);
  await updateDoc(userRef, {
    isAct: isAct,
  });
}

export async function updatePartnerList(user: UserType, partnerId: string, roomId: string) {
  const userRef = doc(fireStore, 'users', user.id);
  await createRefIfNotExist(user);
  await updateDoc(userRef, {
    partners: arrayUnion(partnerId),
    rooms: arrayUnion(roomId)
  });
}

export async function getCurrentUser(user: UserType) {
  const userRef = doc(fireStore, 'users', user.id);
  createRefIfNotExist(user)
  const userSnap = await getDoc(userRef);
  return userSnap.data()
}

export async function getPartners(user: UserType) {
  let partners: (UserType & { isAct: boolean })[] = [];
  const userData = await getCurrentUser(user);
  if (userData && userData.partners?.length > 0) {
    const partnersQuery = query(collection(fireStore, 'users'), where('id', 'in', userData.partners));
    const partnersSnapshot = await getDocs(partnersQuery);
    partnersSnapshot.forEach(user => {
      const userData = user.data()
      partners.push({
        id: userData.id,
        name: userData.name,
        avatar: userData.avatar,
        isAct: userData.isAct,
      });
    })
  }
  return partners;
}

export async function checkRoomExist(senderId: string, receiverId: string, isSecondStep?: boolean): Promise<boolean | string> {
  const roomRef = doc(fireStore, 'chat_rooms', senderId + '_' + receiverId);
  const roomSnap = await getDoc(roomRef);
  return roomSnap.exists()
    ? senderId + '_' + receiverId
    : isSecondStep
      ? false
      : await checkRoomExist(receiverId, senderId, true);
}

export async function createNewRoom(sender: UserType, receiver: UserType) {
  const isRoomExist = await checkRoomExist(receiver.id, sender.id);
  if (!isRoomExist) {
    const roomId = sender.id + '_' + receiver.id;
    const roomRef = doc(fireStore, 'chat_rooms', roomId);
    await updatePartnerList(sender, receiver.id, roomId);
    await updatePartnerList(receiver, sender.id, roomId);
    await setDoc(roomRef, {
      name: roomId,
      user: [sender, receiver],
      lastMsg: null,
      lastMsgTime: null,
      lastMsgBy: null
    });
  }
}


export async function sendMsg(roomId: string, lastMsgBy: string, msg: string, lastMsgTime: number) {
  const roomRef = doc(fireStore, 'chat_rooms', roomId);
  await updateDoc(roomRef, {
    lastMsg: msg,
    lastMsgTime: lastMsgTime,
    lastMsgBy: lastMsgBy
  });
}

export default fireStore
