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