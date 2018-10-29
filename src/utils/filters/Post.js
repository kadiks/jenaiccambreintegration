const moment = require('moment');
const Limits = require('./Limits');

// const PUBLISH_TIME = 18;

class Post {

    getAllJournalPosts({ posts }) {
        
        let filteredPosts = posts.edges.filter(({ node }) => {
            let isSelected = false;
        
            node.categories.forEach(cat => {
                if (cat.name === "Journal") {
                    isSelected = true;
                }
            });

            const post = this.getTransformedPost({ post: node });
            
            return isSelected === true;
        });
        filteredPosts = filteredPosts.map(p => p.node);

        return filteredPosts;
    }

    getAllJournalPostsByLanguage({ posts, language = "en" }) {
        let filteredPosts = this.getAllJournalPosts({ posts });

        filteredPosts = filteredPosts.filter(post => {
            let isSelected = true;
            const isFrenchPost = this.isFrenchPost({ post });
            if (language === "en" && isFrenchPost === true) {
                isSelected = false;
            }
            if (language === "fr" && isFrenchPost === false) {
                isSelected = false;
            }
            return isSelected;
        });

        return filteredPosts;
    }

    getDateFormatLanguage({ language = "en" }) {
        return language === "en" ? "ddd, Do MMM YYYY" : "dddd D MMM YYYY";
    }


    getJournalPosts({ posts }) {

        // const endDay = 31;
        // const startDate = moment([2017, 11, 5]);
        let filteredPosts = this.getAllJournalPosts({ posts });

        filteredPosts = filteredPosts.filter(post => {

            const { minTimestamp, maxTimestamp } = Limits();
        
            return post.timestamp <= maxTimestamp && post.timestamp >= minTimestamp;
        });

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

        return otherLanguagePosts[0] || null;
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
            // console.log('utils/filters/Post#getJournalPostsByLanguage isFrenchPost', isFrenchPost);
            // console.log('utils/filters/Post#getJournalPostsByLanguage isSelected', isSelected);
            // console.log('---');
            return isSelected;
        });

        return filteredPosts;
    }

    getNextDaysPosts({ post, posts, language }) {
        let filteredPosts = this.getJournalPostsByLanguage({ posts, language });

        const todayTimestamp = moment(post.date).startOf("day");
        const yesterdayTimestamp = Number(todayTimestamp.subtract(1, "day").format("x"));
        const tomorrowTimestamp = Number(todayTimestamp.add(2, "day").format("x"));

        const selectedPosts = { next: null, prev: null };

        filteredPosts.forEach(curPost => {
            const { timestamp } = curPost;
            if (timestamp === yesterdayTimestamp) {
                selectedPosts.prev = curPost;
            }
            if (timestamp === tomorrowTimestamp) {
                selectedPosts.next = curPost;
            }
        });

        // console.log('src/utils/filters/Post#getNextDaysPosts selectedPosts.length', selectedPosts);

        // filteredPosts = _.sortBy(filteredPosts, ['timestamp']);

        return selectedPosts;
    }

    getTransformedPost({ post }) {
        const date = moment(post.date).startOf("day");
            
        post.timestamp = Number(date.format("x"));
        post.dateObject = {
            m: date.format("MM"),
            y: date.format("YYYY"),
            d: date.format("DD")
        };
        const language = this.isFrenchPost({ post }) ? "fr" : "en";
        post.url = `/${language}/${post.dateObject.y}/${post.dateObject.m}/${post.dateObject.d}/${post.slug}`;
        return post;
    }

    isFrenchPost({ post }) {
        const tags = post.tags || [];
        const tagNames = tags.map(t => t.name);
        return tagNames.includes("french");
    }
}

module.exports = new Post();