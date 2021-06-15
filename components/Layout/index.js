import { Box, Container} from '@chakra-ui/react'
import Header from './Header'
import {useEffect, useState} from 'react'
import Router from 'next/router'

export default function Layout({children}) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = () => {
      /* console.log("start"); */
      setLoading(true);
    };
    const end = () => {
      /* console.log("findished"); */
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);
  
  return (
    <Container>
      <Header />
     
      <Box
        w="full"
      >
        {/* {loading ? (
          <h1>Loading...</h1>
        ) : null} */}
        {children}
      </Box>

      {/* <Footer 
        {...footer} 
      /> */}
    </Container>
  )
}
