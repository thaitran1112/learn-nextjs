import React from 'react';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import _get from 'lodash/get';
import _map from 'lodash/map';

export interface PostDetailPageProps {
  userId: number;
  id: number;
  title: string;
  body: string;
}


export default function PostDetailPage(props: PostDetailPageProps) {
  const router = useRouter();
  const title = _get(props, 'title', '');
  const content = _get(props, 'body', '')
  return <div>
    <h1>{title}</h1>
    <p>{content}</p>
  </div>;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data  = await res.json();

  return {
    paths: [..._map(data, (post: PostDetailPageProps)  => ({ params: {postId: `${_get(post,'id')}`}}))],
    fallback: false
  }
}

export const getStaticProps:  GetStaticProps<PostDetailPageProps> = async (context: GetStaticPropsContext) => {
  const postId = _get(context, 'params.postId');
  if (!postId) return { notFound: true};
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  const post = await res.json();

  return {
    props: {...post}
  }
}