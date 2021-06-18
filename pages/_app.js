import "@fontsource/spectral-sc/300.css"
import "@fontsource/eb-garamond/400.css"
import "@fontsource/eb-garamond/700.css"

import {ChakraProvider} from '@chakra-ui/react'
import theme from '../theme'

function MyApp({Component, pageProps}) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
