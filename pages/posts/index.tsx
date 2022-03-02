import React from 'react';
import _isArray from 'lodash/isArray';
import _map from 'lodash/map';
import { GetStaticProps, GetStaticPropsContext } from 'next';

export interface PostPageProps {
  userId: number;
  id: number;
  title: string;
  body: string;
}
export interface PostListPageProps {
  posts: PostPageProps[];
}

export default function PostListPage({ posts }: PostListPageProps){
  return (
    <div>
      <h1>Post List Page</h1>
      <ul>
        {_isArray(posts) && _map(posts, post => (
           <li key={post.id}>{post?.title}</li>
        ))}
      </ul>
    </div>
  )
}


export const getStaticProps: GetStaticProps<PostListPageProps> = async (context: GetStaticPropsContext) => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await res.json();

  return {
    props: {
      posts: [...posts]
    },
  }
}