import {Link as ChakraLink} from '@chakra-ui/react'
import NextLink from 'next/link'

const Link = ({href, children}) => {
  if (!href) return null

  return (
    <ChakraLink as={NextLink} href={href}>
      {children}
    </ChakraLink>
  )
}

export default Link