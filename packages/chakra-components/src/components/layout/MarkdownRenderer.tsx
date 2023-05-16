import { Box, Code, Heading, Link, ListItem, OrderedList, Text, UnorderedList } from '@chakra-ui/layout'
import { chakra } from '@chakra-ui/system'
import { Table, Tr } from '@chakra-ui/table'
import type { PropsWithChildren } from 'react'
import ReactMarkdown, { Options } from 'react-markdown'
import remarkGfm from 'remark-gfm'

type MarkdownRenderer = PropsWithChildren<Options>

const MDR = ({ children, ...rest }: MarkdownRenderer) => {
  if (!children) {
    return null
  }

  return (
    <ReactMarkdown
      children={children}
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ node, children, ...props }) => (
          <Link {...props} target='_blank'>
            {children}
          </Link>
        ),
        h1: ({ node, children, ...props }) => (
          <Heading size='lg' mt={5} mb={4} {...props}>
            {children}
          </Heading>
        ),
        h2: ({ node, children, ...props }) => (
          <Heading size='md' mt={5} mb={4} {...props}>
            {children}
          </Heading>
        ),
        h3: ({ node, children, ...props }) => (
          <Heading as='h3' size='sm' mt={5} mb={4} {...props}>
            {children}
          </Heading>
        ),
        ol: ({ node, children, ...props }) => <OrderedList {...props}>{children}</OrderedList>,
        ul: ({ node, children, ...props }) => <UnorderedList {...props}>{children}</UnorderedList>,
        li: ({ node, children, ...props }) => <ListItem {...props}>{children}</ListItem>,
        p: ({ node, children, ...props }) => (
          <Text fontWeight='medium' mb={4}>
            {children}
          </Text>
        ),
        table: ({ node, children, ...props }) => (
          <Box overflowX='auto' maxW='full'>
            <Table {...props}>{children}</Table>
          </Box>
        ),
        tr: ({ node, children, ...props }) => <Tr {...props}>{children}</Tr>,
        code: ({ node, children, ...props }) => <Code {...props}>{children}</Code>,
      }}
      {...rest}
    />
  )
}

const MarkdownRenderer = chakra(MDR)
MarkdownRenderer.displayName = 'MarkdownRenderer'

export default MarkdownRenderer
