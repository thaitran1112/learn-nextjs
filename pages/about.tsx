import _isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
export interface AboutPageProps {

}
export default function AboutPage(props: AboutPageProps) {
    const router = useRouter();
    
    useEffect((): void => {
        if (!_isEmpty(router.query)) {
            console.log('AboutPage ~ router', router.query)
        } 
    }, [router.query])   
    
 return <div>About Page</div>
}

export async function getServerSideProps() {
    return {
      props: {}, // will be passed to the page component as props
    }
  }