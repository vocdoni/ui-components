import { ChakraProps } from '@chakra-ui/system';
import { IQuestion } from '@vocdoni/sdk';
type QuestionFieldProps = ChakraProps & {
    question: IQuestion;
};
export declare const QuestionField: {
    ({ question, ...rest }: QuestionFieldProps): JSX.Element;
    displayName: string;
};
export {};
