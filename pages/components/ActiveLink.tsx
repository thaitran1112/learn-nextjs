import { useRouter } from 'next/router';
import _get from 'lodash/get';
import React from 'react';

export interface ActiveLinkProps {
    children: React.ReactNode;
    href: string;
}

export default function ActiveLink(props: ActiveLinkProps) {
    const router = useRouter();
    const children = _get(props, 'children', null);
    const href = _get(props, 'href', '');
    const style = {
        marginRight: 10,
        color: router.asPath === href ? 'red' : 'black',
    }

    const handleClick = (e: any) => {
        e.preventDefault();
        router.push(href);
    }

    return (
        <a href={href} onClick={handleClick} style={style}>{children}</a>
    )
}