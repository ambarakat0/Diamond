/** @format */

import { db } from '../../components/Firebase/Firebase';

export const addCommentOrShare = async (
   ownerOfData,
   datapassed,
   typeOfAction
) => {
   try {
      let dataToChange = null;
      await db
         .collection('Posts')
         .where('UserId', '==', ownerOfData)
         .get()
         .then((snapshot) =>
            snapshot.forEach((doc) => {
               db.collection('Posts')
                  .doc(doc.id)
                  .get()
                  .then((doc) => {
                     if (typeOfAction === 'Comment') {
                        dataToChange = doc.data().Comment;
                        db.collection('Posts')
                           .where('UserId', '==', ownerOfData)
                           .get()
                           .then((snapshot) => {
                              snapshot.forEach((doc) => {
                                 db.collection('Posts')
                                    .doc(doc.id)
                                    .set(
                                       {
                                          Comment: [
                                             ...dataToChange,
                                             {
                                                id:
                                                   datapassed.uid +
                                                   datapassed.time,
                                                img: datapassed.imgPro,
                                                text: datapassed.text,
                                                name: datapassed.name,
                                                nickname: datapassed.nickname,
                                                time: datapassed.time,
                                                downvote: [],
                                                upvote: [],
                                             },
                                          ],
                                       },
                                       { merge: true }
                                    );
                              });
                           });
                     } else {
                        dataToChange = doc.data().Share;
                        db.collection('Posts')
                           .where('UserId', '==', ownerOfData)
                           .get()
                           .then((snapshot) => {
                              snapshot.forEach((doc) => {
                                 db.collection('Posts')
                                    .doc(doc.id)
                                    .set(
                                       {
                                          Share: [
                                             ...dataToChange,
                                             {
                                                id: datapassed.uid,
                                                img: datapassed.imgPro,
                                             },
                                          ],
                                       },
                                       { merge: true }
                                    );
                              });
                           });
                     }
                  });
            })
         );
   } catch (err) {
      console.log(err);
   }
};

export const toggleLike = (ownerOfData, datapassed) => {
   try {
      db.collection('Posts')
         .where('UserId', '==', ownerOfData)
         .get()
         .then((snapshot) =>
            snapshot.forEach((doc) => {
               db.collection('Posts')
                  .doc(doc.id)
                  .get()
                  .then((doc) => {
                     if (doc.data().Like.includes(datapassed.uid)) {
                        db.collection('Posts')
                           .where('UserId', '==', ownerOfData)
                           .get()
                           .then((snapshot) => {
                              snapshot.forEach((doc) => {
                                 let data = doc
                                    .data()
                                    .Like.filter(
                                       (like) => like !== datapassed.uid
                                    );
                                 db.collection('Posts').doc(doc.id).update({
                                    Like: data,
                                 });
                              });
                           });
                     } else {
                        db.collection('Posts')
                           .where('UserId', '==', ownerOfData)
                           .get()
                           .then((snapshot) => {
                              snapshot.forEach((doc) => {
                                 let data = doc.data().Like;
                                 let newData = [...data, datapassed.uid];
                                 db.collection('Posts').doc(doc.id).update({
                                    Like: newData,
                                 });
                              });
                           });
                     }
                  });
            })
         );
   } catch (err) {
      console.log(err);
   }
};

export const displayLikeStar = (ownerOfData, uid, setLike) => {
   try {
      db.collection('Posts')
         .where('UserId', '==', ownerOfData)
         .get()
         .then((snapshot) =>
            snapshot.forEach((doc) => {
               db.collection('Posts')
                  .doc(doc.id)
                  .get()
                  .then((doc) => {
                     if (doc.data().Like.includes(uid)) {
                        setLike(true);
                     } else setLike(false);
                  });
            })
         );
   } catch (err) {
      console.log(err);
   }
};

export const displaybookmark = async (ownerId, uid, setBookmark) => {
   const docRef = db
      .collection('users')
      .doc(uid)
      .collection('bookmark')
      .doc(ownerId);
   const doc = await docRef.get();
   if (doc.exists) setBookmark(true);
   else setBookmark(false);
};

export const share = (uid, data) => {
   try {
      db.collection('users')
         .doc(uid)
         .collection('posts')
         .add(data)
         .then(() => console.log('done'));
   } catch (err) {
      console.log(err);
   }
};
