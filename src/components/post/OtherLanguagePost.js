import React from 'react';
import Link from 'gatsby-link';
import moment from 'moment';
import filterPost from '../../utils/filters/Post';
import FlagIcon from "../flags/FlagIcon";

export default class OtherPost extends React.Component {
    isFrenchPost({ post }) {
        const tags = post.tags || [];
        const tagNames = tags.map(t => t.name);
        return tagNames.includes("french");
    }

    render() {
        const { language, posts, post } = this.props;
        const availableText = language === "en" ?
            "Article disponible en français : " :
            "Post available in English: ";
        // const isLookingForFrenchPost = language === "en" ? true : false;
        // let curPost = null;
        // const postTimestamp = Number(moment(post.date).startOf('day').format('x'));

        // posts.edges.forEach(({ node }) => {
        //     let tags = node.tags || [];
        //     tags = tags.map(t => t.name);

        //     const date = moment(node.date).startOf('day');
        //     node.dateObject = {
        //         m: date.format("MM"),
        //         y: date.format("YYYY"),
        //         d: date.format("DD")
        //       };
            
        //     const timestamp = Number(moment(node.date).startOf('day').format('x'));

        //     if (postTimestamp === timestamp) {
        //         // console.log('node', node);
        //         // console.log('this.isFrenchPost({ post: node })', this.isFrenchPost({ post: node }));
        //         // console.log('isLookingForFrenchPost', isLookingForFrenchPost);
        //         if (this.isFrenchPost({ post: node }) === isLookingForFrenchPost) {
        //             curPost = node;
        //         }
        //     }
        // });

        const curPost = filterPost.getJournalPostInOtherLanguage({ post, posts });

        // console.log('cmp/post/OtherLanguagePost curPost', curPost);

        if (curPost === null) {
            return null;
        }

        const link = `${language === "en" ? "fr" : "en"}/${curPost.dateObject.y}/${curPost.dateObject.m}/${curPost.dateObject.d}/${curPost.slug}`;
        return (
            <p>
                <small style={{ fontStyle: "italic" }}>
                    <FlagIcon code={language === "en" ? "fr" : "gb"} /> {availableText}<Link to={link} dangerouslySetInnerHTML={{ __html: post.title }} />
                </small>
            </p>
        );
    }
}