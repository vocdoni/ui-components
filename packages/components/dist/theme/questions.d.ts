export declare const questionsAnatomy: string[];
export declare const QuestionsTheme: {
    baseStyle?: {
        question: {
            marginBottom: number;
        };
        title: {
            fontWeight: string;
            fontSize: string;
            marginBottom: number;
        };
        description: {
            marginBottom: number;
        };
    } | undefined;
    sizes?: {
        [key: string]: import("@chakra-ui/styled-system").PartsStyleInterpolation<{
            keys: string[];
        }>;
    } | undefined;
    variants?: {
        [key: string]: import("@chakra-ui/styled-system").PartsStyleInterpolation<{
            keys: string[];
        }>;
    } | undefined;
    defaultProps?: {
        size?: string | number | undefined;
        variant?: string | number | undefined;
        colorScheme?: string | undefined;
    } | undefined;
    parts: string[];
};
