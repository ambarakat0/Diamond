/** @format */

import React, { Fragment, useEffect, useState, useContext } from 'react';

import classes from './Bookmarks.css';

import BookmarkPost from './BookmarkPost/BookmarkPost';
import Nav from '../../../components/Nav/Nav';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { fetchBookmarks } from '../../../Shared/handleData';

import { authStateContext } from '../../../Global/TrackAuthState';

const bookmark = (props) => {
   const [data, setData] = useState(null);
   const [postsNum, setPostsNum] = useState(null);

   const user = useContext(authStateContext).initState;

   useEffect(() => {
      fetchBookmarks(user.uid)
         .then((res) => {
            setData(res.posts);
            setPostsNum(res.posts.length);
         })
         .catch((err) => {
            console.log(err);
         });
   }, []);

   if (data) {
      const posts = data.map((post) => (
         <BookmarkPost
            key={`${post.data.NickName}-${Math.random(20000)}`}
            name={post.data.Name}
            nickname={post.data.Nickname}
            text={post.data.Text}
            time={post.data.Time}
            tags={post.data.Tags}
            img={post.data.Img}
            video={post.data.Video}
            imgC={post.data.ImgContent}
            share={post.data.Share}
            comment={post.data.Comment}
            like={post.data.Like}
            public={post.data.Public}
            ownerId={post.data.OwnerId}
         />
      ));
      return (
         <div>
            <div className={classes.TitleContainer}>
               <h1 className={classes.Title}>Bookmarks</h1>
               <p className={classes.Remain}>{postsNum}/50</p>
            </div>
            <div className={classes.Container}>
               <Nav />
               <div className={classes.Main}>{posts}</div>
            </div>
         </div>
      );
   } else {
      let spinner = (
         <div style={{ textAlign: 'center' }}>
            <Spinner />
         </div>
      );
      return <Fragment>{spinner}</Fragment>;
   }
};

export default bookmark;
