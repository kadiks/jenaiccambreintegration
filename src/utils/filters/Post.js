import moment from 'moment';

class Post {
    getJournalPosts({ posts }) {

        const endDay = 31;
        const startDate = moment([2017, 11, 5]);

        let filteredPosts = posts.edges.filter(({ node }) => {
            let isSelected = false;
            const maxTimestamp = Number(
                moment()
                .subtract(endDay, "day")
                .startOf("day")
                .format("x")
            );
            const minTimestamp = Number(startDate.format('x'));
        
            node.categories.forEach(cat => {
                if (cat.name === "Journal") {
                isSelected = true;
                }
            });
            let tags = node.tags || [];
            tags = tags.map(t => t.name);

            const post = this.getTransformedPost({ post: node });
            
            // console.log('---');
            // console.log('utils/filters/Post#getPosts node', node);
            // console.log('utils/filters/Post#getPosts language', language);
            // console.log('utils/filters/Post#getPosts tags', tags);
            // console.log('utils/filters/Post#getPosts isFrenchPost', this.isFrenchPost({ post: node }));
            // console.log('utils/filters/Post#getPosts isSelected', isSelected);
            // console.log('utils/filters/Post#getPosts isSelected', );
            // console.log('utils/filters/Post#getPosts date', date);
            // console.log('utils/filters/Post#getPosts maxTimestamp', maxTimestamp);
            // console.log('---');
            return isSelected === true && post.timestamp <= maxTimestamp && post.timestamp >= minTimestamp;
        });

        filteredPosts = filteredPosts.map(p => p.node);
        return filteredPosts;
    }

    getJournalPostInOtherLanguage({ post, posts }) {
        const language = this.isFrenchPost({ post }) ? "en" : "fr";
        const detailedPost = this.getTransformedPost({ post });
        let filteredPosts = this.getJournalPostsByLanguage({ posts, language });

        const otherLanguagePosts = filteredPosts.filter(post => {
            return detailedPost.timestamp === post.timestamp;
        });

        // console.log('utils/filter/Post#getJournalPostInOtherLanguage otherLanguagePosts', otherLanguagePosts);
        // console.log('utils/filter/Post#getJournalPostInOtherLanguage language', language);
        // console.log('utils/filter/Post#getJournalPostInOtherLanguage post', post);

        return otherLanguagePosts[0];
    }

    getJournalPostsByLanguage({ posts, language = "en" }) {
        let filteredPosts = this.getJournalPosts({ posts });

        filteredPosts = filteredPosts.filter(post => {
            let isSelected = true;
            const isFrenchPost = this.isFrenchPost({ post });
            if (language === "en" && isFrenchPost === true) {
                isSelected = false;
            }
            if (language === "fr" && isFrenchPost === false) {
                isSelected = false;
            }

            // console.log('---');
            // console.log('utils/filters/Post#getJournalPostsByLanguage post.title', post.title);
            // console.log('utils/filters/Post#getJournalPostsByLanguage language', language);
            // console.log('utils/filters/Post#getJournalPostsByLanguage tags', tags);
            // console.log('utils/filters/Post#getJournalPostsByLanguage isFrenchPost', isFrenchPost);
            // console.log('utils/filters/Post#getJournalPostsByLanguage isSelected', isSelected);
            // console.log('utils/filters/Post#getJournalPostsByLanguage date', date);
            // console.log('utils/filters/Post#getJournalPostsByLanguage maxTimestamp', maxTimestamp);
            // console.log('---');
            return isSelected;
        });

        return filteredPosts;
    }

    getTransformedPost({ post }) {
        const date = moment(post.date).startOf("day");
            
        post.timestamp = Number(date.format("x"));
        post.dateObject = {
            m: date.format("MM"),
            y: date.format("YYYY"),
            d: date.format("DD")
        };
        return post;
    }

    isFrenchPost({ post }) {
        const tags = post.tags || [];
        const tagNames = tags.map(t => t.name);
        return tagNames.includes("french");
    }
}

export default new Post();