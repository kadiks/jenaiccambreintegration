import React from "react";
import moment from "moment";
import "moment/min/locales.min";
import Link from "gatsby-link";

import Styles from "../utils/Styles";

import Activities from "../components/activity";
import filterPost from "../utils/filters/Post";

class LastDays extends React.Component {
  getDays() {
    // const sinceDay = 20;
    const endDay = 31;
    const startDate = moment([2017, 11, 5]);
    const activities = this.getActivities({ endDay, startDate });
    const posts = this.getPosts({ endDay, startDate });
    const days = this.mergeIntoDays({ posts, activities });
    // console.log("#getDays days", days);
    // console.log("#getDays posts", posts);
    // console.log("#getDays activities", activities);
    return days;
  }

  getActivities({ endDay, startDate }) {
    const { edges } = this.props.activities;
    const maxTimestamp = Number(
      moment()
        .subtract(endDay, "day")
        .startOf("day")
        .format("x")
    );
    const minTimestamp = Number(startDate.format('x'));
    let activities = edges.filter(({ node }) => {
      const date = moment(node.day);
      node.timestamp = Number(date.format('x'));
      // console.log("#getActivities date", node.timestamp, minTimestamp, maxTimestamp);
      return node.timestamp <= maxTimestamp && node.timestamp >= minTimestamp;
    });
    activities = activities.map(day => day.node);
    activities = _.sortBy(activities, ["day"]);
    activities.reverse();
    const group = this.groupArray({ grouper: "timestamp", array: activities });
    // activities = activities.slice(0, 3);
    // console.log("#getActivities group", group);
    // console.log("#getActivities activities", activities);
    return group;
  }

  getPosts({ endDay, startDate }) {
    const { posts, language } = this.props;

    let filteredPosts = filterPost.getJournalPostsByLanguage({ posts, language });
    // console.log('cmp/LastDays#getPosts filteredPosts', filteredPosts);
    filteredPosts = _.sortBy(filteredPosts, ["timestamp"]);
    filteredPosts.reverse();
    // posts = posts.slice(0, 3);
    const group = this.groupArray({ grouper: "timestamp", array: filteredPosts });
    // console.log('cmp/LastDays#getPosts group', group);
    // console.log('cmp/LastDays#getPosts posts', posts);
    return group;
    // const language = this.props.language === "fr" ? "french" : null;
    // // console.log("cmp/LastDays#getPosts edges", edges);
    // let posts = edges.filter(({ node }) => {
    //   let isSelected = false;
    //   const maxTimestamp = Number(
    //     moment()
    //       .subtract(endDay, "day")
    //       .startOf("day")
    //       .format("x")
    //   );
    //   const minTimestamp = Number(startDate.format('x'));

    //   const date = moment(node.date).startOf("day");
    //   node.categories.forEach(cat => {
    //     if (cat.name === "Journal") {
    //       isSelected = true;
    //     }
    //   });
    //   let tags = node.tags || [];
    //   tags = tags.map(t => t.name);
    //   if (isSelected === true) {
    //     if (language === null && this.isFrenchPost({ post: node }) === true) {
    //       isSelected = false;
    //     }
    //     if (language === "french" && this.isFrenchPost({ post: node }) === false) {
    //       isSelected = false;
    //     }
    //   }
    //   node.timestamp = Number(date.format("x"));
    //   node.dateObject = {
    //     m: date.format("MM"),
    //     y: date.format("YYYY"),
    //     d: date.format("DD")
    //   };
    //   // console.log('---');
    //   // console.log('cmp/LastDays#getPosts node', node);
    //   // console.log('cmp/LastDays#getPosts language', language);
    //   // console.log('cmp/LastDays#getPosts tags', tags);
    //   // console.log('cmp/LastDays#getPosts isFrenchPost', this.isFrenchPost({ post: node }));
    //   // console.log('cmp/LastDays#getPosts isSelected', isSelected);
    //   // console.log('cmp/LastDays#getPosts isSelected', );
    //   // console.log('cmp/LastDays#getPosts date', date);
    //   // console.log('cmp/LastDays#getPosts maxTimestamp', maxTimestamp);
    //   // console.log('---');
    //   return isSelected === true && date <= maxTimestamp && date >= minTimestamp;
    // });
    // // console.log('cmp/LastDays#getPosts posts', posts);
    // posts = posts.map(day => day.node);
    // // const days = [];
    // posts = _.sortBy(posts, ["timestamp"]);
    // posts.reverse();
    // // posts = posts.slice(0, 3);
    // const group = this.groupArray({ grouper: "timestamp", array: posts });
    // // console.log('cmp/LastDays#getPosts group', group);
    // // console.log('cmp/LastDays#getPosts posts', posts);
    // return group;
  }

  groupArray({ grouper, array }) {
    // const uniqObject = _.uniqBy(array, grouper);
    // const uniq = uniqObject.map(o => o[grouper]);
    const group = {};

    // array.forEach(o => {
    //   const { timestamp } = o;
    //   const index = uniq.indexOf(timestamp);
    // });
    array.forEach(o => {
      if (group.hasOwnProperty(o[grouper]) === false) {
        group[o[grouper]] = [];
      }
      group[o[grouper]].push(o);
    });
    return group;
  }

  isFrenchPost({ post }) {
    const tags = post.tags || [];
    const tagNames = tags.map(t => t.name);
    return tagNames.includes("french");
  }

  mergeIntoDays({ posts, activities }) {
    const postsKeys = Object.keys(posts);
    const activitiesKeys = Object.keys(activities);
    let timestamps = _.merge(postsKeys, activitiesKeys);
    // console.log("#mergeIntoDays timestamps #1", timestamps);
    // console.log("#mergeIntoDays postsKeys", postsKeys);
    // console.log("#mergeIntoDays posts", posts);
    // console.log("#mergeIntoDays activities", activities);
    // console.log("#mergeIntoDays activitiesKeys", activitiesKeys);
    timestamps = timestamps.map(t => Number(t));
    timestamps = _.sortBy(timestamps, [t => t]);
    // console.log("#mergeIntoDays timestamps #2", timestamps);
    timestamps.reverse();
    // console.log("#mergeIntoDays timestamps ##3", timestamps);
    const days = [];
    timestamps.forEach((ts, index) => {
      days.push({
        post: _.get(posts, `[${ts}][0]`, {}),
        activities: activities[ts] || []
      });
    });
    // console.log("#mergeIntoDays timestamps", timestamps);
    return days;
  }

  renderDay({ post, activities, index }) {
    // console.log("pages/index#renderDay post", post);
    // console.log("pages/index#renderDay activities", this.props.language);
    const { language = "en" } = this.props;
    moment.locale(language);
    const dateFormat = language === "en" ?
      "ddd MMM, Do" :
      "ddd DD MMM"
    ;
    const date = post.date || activities[0].timestamp;
    return (
      <div className="col-12 col-xs-12 col-sm-4" key={index}>
        <h2
          style={{
            textAlign: "center"
          }}
        >
          {moment(date).format(dateFormat)}
        </h2>
        {this.renderSummary({ post })}
        {this.renderActivities({ activities })}
      </div>
    );
  }

  renderSummary({ post }) {
    if (Object.keys(post).length === 0) {
      return;
    }

    const { language = "en" } = this.props;

    const link = `${language}/${post.dateObject.y}/${post.dateObject.m}/${
      post.dateObject.d
    }/${post.slug}`;
    return (
      <div
        style={{
          backgroundColor: Styles.colors.background,
          color: Styles.colors.body,
          padding: "1px 15px",
          boxShadow: "10px 15px rgba(0, 0, 0, 0.2)",
          marginBottom: 25
        }}
      >
        <Link to={link} css={{ textDecoration: `none` }}>
          <h3 style={{ color: Styles.colors.main }}>{post.title}</h3>
        </Link>
        <div
          dangerouslySetInnerHTML={{
            __html: `${post.excerpt.slice(0, 100)}...`
          }}
        />
      </div>
    );
  }

  renderActivities({ activities }) {
    if (activities.length === 0) {
      return null;
    }
    const privateActivities = ["sex", "solo_pleasure"];
    const extractedActivities = [
      "dinner",
      "lunch",
      "breakfast",
      "snacks_as_breakfast",
      "snacks_as_lunch",
      "snacks_as_dinner"
    ];

    _.remove(activities, a => privateActivities.includes(a.slug));
    // _.remove(activities, a => extractedActivities.includes(a.slug));

    const slugs = activities.map(a => a.slug);

    const group = {};

    slugs.forEach(act => {
      // console.log("#renderActivities act", act);
      if (group.hasOwnProperty(act) === false) {
        group[act] = 0;
      }
      group[act]++;
    });

    const groupKeys = Object.keys(group);

    return <Activities activities={group} />;
  }

  render() {
    let days = this.getDays();
    const { language = "en" } = this.props;
    moment.locale(language);
    // console.log("cmp/LastDays#render days", days);
    // console.log("cmp/LastDays#render React.version", React.version);
    days = days.slice(0, 3);
    return (
      <div className="row">
        {days.map(({ post, activities }, index) =>
          this.renderDay({ post, activities, index })
        )}
      </div>
    );
  }
}

export default LastDays;
