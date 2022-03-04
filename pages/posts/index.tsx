import React from 'react';
import _isArray from 'lodash/isArray';
import _map from 'lodash/map';
import _get from 'lodash/get';
import Link from 'next/Link';
import { GetStaticProps, GetStaticPropsContext } from 'next';

export interface PostPageProps {
  id: string;
  title: string;
  author: string;
  description: string;
  createdAt: number;
  updatedAt: number;
  imageUrl: string;
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
           <li key={_get(post, 'id')}>
             <Link href={`/posts/${_get(post, 'id')}`}><a>{_get(post, 'title')}</a></Link>
           </li>
        ))}
      </ul>
    </div>
  )
}

export const getStaticProps: GetStaticProps<PostListPageProps> = async (context: GetStaticPropsContext) => {
  const res = await fetch('https://js-post-api.herokuapp.com/api/posts');
  const data = await res.json();

  return {
    props: {
      posts: data,
    },
  }
}