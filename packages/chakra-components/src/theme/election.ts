import { ComponentSingleStyleConfig, theme } from '@chakra-ui/react'

export const ElectionTitleTheme: ComponentSingleStyleConfig = {
  baseStyle: {
    ...theme.components.Heading.baseStyle,
    ...theme.components.Heading.sizes?.xl,
    textAlign: 'center',
    lineHeight: 1.1,
    mb: 3,
  },
}

export const ElectionScheduleTheme: ComponentSingleStyleConfig = {
  baseStyle: {
    ...theme.components.Heading.baseStyle,
    ...theme.components.Heading.sizes?.sm,
    textAlign: 'center',
    fontStyle: 'italic',
    color: 'gray.400',
  },
}
