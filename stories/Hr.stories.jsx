// import { HR } from "@vocdoni/components-voting";
import { HR } from "@vocdoni/components-voting/src/theme/layout";

//👇 This default export determines where your story goes in the story list
export default {
    /* 👇 The title prop is optional.
    * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
    * to learn how to generate automatic titles
    */
    title: 'HR',
    component: HR,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <HR {...args} />;

export const FirstStory = {
    args: {
        // variant: "question"
    },
};