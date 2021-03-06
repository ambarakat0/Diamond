/** @format */

import React, { useState, Fragment, useContext, useEffect } from 'react';
import IconWithTooltip from '../../../components/UI/IconWithTooltip/IconWithTooltip';
import Icon from '../../../components/UI/Icon/Icon';
import classes from './SinglePost.css';
import TextArea from '../../../components/AddPost/TextArea/TextArea';
import Button from '../../../components/UI/Button/Button';
import Popup from '../../../components/UI/Popup/Popup';
import Spinner from '../../../components/UI/Spinner/Spinner';

import { withRouter } from 'react-router-dom';

import { timeDiffCalc, fetchUserData } from '../../../Shared/utility';
import {
   addCommentOrShare,
   toggleLike,
   displayLikeStar,
   share,
   displaybookmark,
} from '../ReactToPost';

import { authStateContext } from '../../../Global/TrackAuthState';
import { db } from '../../../components/Firebase/Firebase';

const singlePost = React.memo((props) => {
   const [userData, setUserData] = useState(null);

   const [showComment, setShowComment] = useState(false);
   const [like, setLike] = useState(false);
   const [bookmark, setBookmark] = useState(false);
   const [showPopup, setShowPopup] = useState(false);
   const [commentContent, setCommentContent] = useState('');
   const [showSpinner, setShowSpinner] = useState(false);

   const user = useContext(authStateContext).initState;

   let data = {
      Time: new Date().getTime(),
      Name: props.name,
      Nickname: props.nickname,
      Text: props.text,
      Tags: props.tags,
      Img: props.img,
      ImgContent: props.imgC,
      Share: props.share,
      Comment: props.comment,
      Like: props.like,
      Public: props.public,
      OwnerId: props.ownerId,
   };

   useEffect(() => {
      if (user) {
         fetchUserData(user, setUserData);
         displayLikeStar(props.ownerId, user.uid, setLike);
         displaybookmark(props.ownerId, user.uid, setBookmark);
      }
   }, [user]);

   const datePassed = timeDiffCalc(new Date(props.time));

   const onCommentHandler = () => {
      if (!commentContent) setShowComment((prevState) => !prevState);
      else setShowPopup(true);
   };

   const onLikeHandler = () => {
      setLike((prevState) => !prevState);
   };

   const onChangeHandler = (e) => {
      setCommentContent(e.target.value);
   };
   const onTagClick = (id) => {
      // if (props.location.pathname === '/tags') props.history.push(`${id}`);
      // else props.history.replace(props.link);
      if (props.location.pathname === '/home') props.history.push(`tags/${id}`);
      else props.history.push(`/tags/${id}`);
   };

   const onAddComment = async () => {
      setShowSpinner(true);
      await addCommentOrShare(
         props.ownerId,
         {
            uid: user.uid,
            imgPro: userData.imgPro,
            name: userData.name,
            nickname: userData.displayName,
            text: commentContent,
            time: new Date().getTime(),
         },
         'Comment'
      );
      setShowSpinner(false);
      setCommentContent('');
   };
   const onAddLike = () => {
      toggleLike(props.ownerId, {
         uid: user.uid,
         imgPro: userData.imgPro,
      });
   };

   const onAddShare = async () => {
      setShowSpinner(true);

      await addCommentOrShare(props.ownerId, {
         uid: user.uid,
         imgPro: userData.imgPro,
      });
      share(user.uid, data);
      setShowSpinner(false);
   };

   const onBookmark = async () => {
      setShowSpinner(true);
      const bookmarkList = await db
         .collection('users')
         .doc(user.uid)
         .collection('bookmark')
         .get();

      if (bookmarkList.docs.length === 0) {
         await db
            .collection('users')
            .doc(user.uid)
            .collection('bookmark')
            .doc(data.OwnerId)
            .set({ data });
         setShowSpinner(false);
      } else {
         const docRef = db
            .collection('users')
            .doc(user.uid)
            .collection('bookmark')
            .doc(data.OwnerId);
         const doc = await docRef.get();
         if (doc.exists) {
            db.collection('users')
               .doc(user.uid)
               .collection('bookmark')
               .doc(data.OwnerId)
               .delete()
               .then(() => {
                  return setShowSpinner(false);
               });
         } else {
            await db
               .collection('users')
               .doc(user.uid)
               .collection('bookmark')
               .doc(data.OwnerId)
               .set({ data }, { merge: true });
            setShowSpinner(false);
         }
      }
   };

   const tags = props.tags.map((tag) => {
      return (
         <div className={classes.Tag} key={tag} onClick={() => onTagClick(tag)}>
            <Icon
               iconname="price-tag"
               classes={classes.Icon}
               containerClass={classes.IconContainer}
            />
            <h4 className={classes.TagText}>{tag}</h4>
         </div>
      );
   });

   let ImgContent = null;
   if (props.imgC) {
      ImgContent = (
         <figure className={classes.ImgContentContainer}>
            <img src={props.imgC} alt="add" className={classes.ImgContent} />
         </figure>
      );
   }

   let VideoContent = null;
   if (props.video) {
      VideoContent = (
         // <VideoPlayer {...videoJsOptions}/>
         <div className={classes.Video}>
            <video className={classes.VideoContent} controls>
               <source src={props.video} type="video/mp4" />
               Your browser is not supported
            </video>
         </div>
      );
   }

   let comment = null;
   if (showComment) {
      comment = (
         <div className={classes.Comment}>
            <TextArea
               value={commentContent}
               placeholder="Comment"
               changed={(e) => onChangeHandler(e)}
            />
            <Button
               clicked={onAddComment}
               className={classes.AddCommentBtn}
               disabled={!commentContent}
            >
               Reply
            </Button>
         </div>
      );
   }

   const onAction = () => {
      setShowPopup(false);
      setShowComment(false);
      setCommentContent('');
   };

   const onCancel = () => {
      setShowPopup(false);
   };

   let popup = null;
   if (showPopup) {
      popup = (
         <Popup
            text="Discard the comment"
            cta="Discard"
            action={onAction}
            cancel={onCancel}
         />
      );
   }

   let spinner = null;
   if (showSpinner) {
      spinner = <Spinner />;
   }

   const goToPost = () => {
      props.history.push(`/${props.nickname}/${props.ownerId}`);
   };
   const goToOwnerPage = () => {
      props.history.push(`/${props.nickname}`);
   };

   return (
      <Fragment>
         {popup}
         <div className={classes.Container}>
            <div className={classes.First}>
               <div className={classes.TagsContainer}>{tags}</div>
               <div className={classes.More}>
                  <IconWithTooltip iconName="equalizer2" text="More" />
               </div>
            </div>
            <div className={classes.Second}>
               <div className={classes.UserData}>
                  <div className={classes.ImgContainer} onClick={goToOwnerPage}>
                     <img
                        src={props.img}
                        alt={props.name}
                        className={classes.Img}
                     />
                  </div>
                  <div
                     style={{
                        display: 'flex',
                        alignItems: 'start',
                        flexDirection: 'column',
                     }}
                  >
                     <h2 className={classes.UserName} onClick={goToOwnerPage}>
                        {props.name}
                     </h2>
                     <h3
                        className={classes.AccountName}
                        onClick={goToOwnerPage}
                     >
                        {props.nickname}
                     </h3>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                     <IconWithTooltip
                        iconName={props.public ? 'earth' : 'user-plus'}
                        text={
                           props.public
                              ? 'Every one can reply'
                              : 'Only who follow you can reply'
                        }
                     />
                  </div>
               </div>
               <div className={classes.Data}>
                  <p className={classes.DataText}>{datePassed}</p>
               </div>
            </div>
            <p className={classes.Text}>{props.text}</p>
            <div className={classes.Third}>
               {ImgContent || VideoContent ? (
                  <div className={classes.Media}>
                     {ImgContent}
                     {VideoContent}
                  </div>
               ) : null}
            </div>
            <div className={classes.Fourth}>
               <div className={classes.ReactIcon} onClick={onCommentHandler}>
                  <IconWithTooltip
                     iconName="bubble2"
                     className={classes.Ic}
                     text="Reply"
                  />
                  <span className={classes.ReactText}>{props.comment}</span>
               </div>
               <div className={classes.ReactIcon} onClick={onLikeHandler}>
                  <IconWithTooltip
                     iconName={like ? 'star-full' : 'star-empty'}
                     text={like ? 'unlike' : 'like'}
                     clicked={onAddLike}
                  />
                  <span className={classes.ReactText}>{props.like}</span>
               </div>
               <div className={classes.ReactIcon}>
                  <IconWithTooltip
                     iconName="share2"
                     text="Share"
                     clicked={onAddShare}
                  />
                  <span className={classes.ReactText}>{props.share}</span>
               </div>
               <div className={classes.ReactIcon}>
                  <IconWithTooltip
                     iconName={bookmark ? 'bookmark' : 'pushpin'}
                     text={bookmark ? 'unBookmark' : 'Bookmark'}
                     clicked={onBookmark}
                  />
               </div>
               <div className={classes.ReactIcon} onClick={goToPost}>
                  <IconWithTooltip iconName="redo2" text="expand post" />
               </div>
            </div>
            {comment}
            {spinner}
         </div>
      </Fragment>
   );
});

export default withRouter(singlePost);
