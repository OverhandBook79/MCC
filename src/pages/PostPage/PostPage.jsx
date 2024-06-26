import React from 'react'
import PostHeader from './PostHeader'
import PostContent from './PostContent'

const PostPage = () => {
  return (
    <>
    <PostHeader img={"/pic1.png"} title='Addon CC201 in Minecraft' username='Jions HD 1080p' date='15/2/2024'/>
    <PostContent/>
    </>
  )
}

export default PostPage