import _get from 'lodash/get';
import _map from 'lodash/map';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import Image from 'next/image';
import React from 'react';

export interface PostDetailPageProps {
  id: string;
  title: string;
  author: string;
  description: string;
  createdAt: number;
  updatedAt: number;
  imageUrl: string;
}

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

export default function PostDetailPage(props: PostDetailPageProps) {
  const title = _get(props, 'title', '');
  const description = _get(props, 'description', '')
  const image = _get(props, 'imageUrl', '');
  const author = _get(props, 'author', '');
  return <div>
    <h1>{title}</h1>
    <Image src={image} placeholder="blur" blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(1368, 400))}`} alt={author} width={1368} height={400}></Image>
    <p>{description}</p>
  </div>;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('https://js-post-api.herokuapp.com/api/posts');
  const data  = await res.json();
  return {
    paths: _map(data, (post: PostDetailPageProps)  => ({ params: {postId: _get(post,'id')}})),
    fallback: false
  }
}

export const getStaticProps:  GetStaticProps<PostDetailPageProps> = async (context: GetStaticPropsContext) => {
  const postId = _get(context, 'params.postId');
  if (!postId) return { notFound: true};
  const res = await fetch(`https://js-post-api.herokuapp.com/api/posts/${postId}`);
  const post = await res.json();

  return {
    props: {...post}
  }
}