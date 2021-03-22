import React, { useContext } from 'react';

import classes from './BookmarkPost.css';

import IconWithTooltip from '../../../../components/UI/IconWithTooltip/IconWithTooltip';
import { withRouter } from 'react-router';

import { db } from '../../../../components/Firebase/Firebase';

import { authStateContext } from '../../../../Global/TrackAuthState';

const bookmarkPost = ({ img, name, nickname, text, ownerId, history }) => {
   const user = useContext(authStateContext).initState;

   const goToPost = () => {
      history.push(`/${nickname}/${ownerId}`);
   };
   const goToOwnerPage = () => {
      history.push(`/${nickname}`);
   };

   const OnUnBookmarkHandler = async () => {
      db.collection('users')
         .doc(user.uid)
         .collection('bookmark')
         .doc(ownerId)
         .delete()
         .then(() => {
            window.location.reload();
         });
   };
   return (
      <div className={classes.Container}>
         <div className={classes.FirstRow}>
            <div className={classes.UserData}>
               <div className={classes.ImgContainer} onClick={goToOwnerPage}>
                  <img src={img} alt={nickname} className={classes.Img} />
               </div>
               <div
                  style={{
                     display: 'flex',
                     alignItems: 'start',
                     justifyContent: 'center',
                     flexDirection: 'column',
                  }}
               >
                  <h2 className={classes.UserName} onClick={goToOwnerPage}>
                     {name}
                  </h2>
                  <h3 className={classes.AccountName} onClick={goToOwnerPage}>
                     {nickname}
                  </h3>
               </div>
            </div>
            <div>
               <IconWithTooltip
                  iconName="redo2"
                  text="see post"
                  clicked={goToPost}
               />
               <IconWithTooltip
                  iconName="bookmark"
                  text="unbookmark"
                  clicked={OnUnBookmarkHandler}
               />
            </div>
         </div>
         <div className={classes.Text}>{text}</div>
      </div>
   );
};

export default withRouter(bookmarkPost);
