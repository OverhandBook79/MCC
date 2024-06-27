import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostHeader from './PostHeader';
import PostContent from './PostContent';

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('contents')) || [];
    const foundPost = data.find(post => post.id === parseInt(id));
    setPost(foundPost);
  }, [id]);

  if (!post) return <div>Loading...</div>;

  return (
    <>
      <PostHeader 
        img={URL.createObjectURL(post.thumbnail)} 
        title={post.title} 
        username={post.username} 
        date={post.date}
      />
      <PostContent content={post} />
    </>
  );
};

export default PostPage;
