import React from "react";
import moment from "moment";
import Link from "gatsby-link";

import Styles from "../utils/Styles";

import Activities from "../components/activity";

class LastDays extends React.Component {
  getDays() {
    const sinceDay = 6;
    const activities = this.getActivities({ sinceDay });
    const posts = this.getPosts({ sinceDay });
    const days = this.mergeIntoDays({ posts, activities });
    // console.log("#getDays days", days);
    return days;
  }

  getActivities({ sinceDay }) {
    const { edges } = this.props.activities;
    const minTimestamp = Number(
      moment()
        .subtract(sinceDay, "day")
        .startOf("day")
        .format("x")
    );
    let activities = edges.filter(({ node }) => {
      const date = Number(moment(node.day).format("x"));
      // console.log("#getActivities date", node, date, minTimestamp);
      node.timestamp = Number(date);
      return date >= minTimestamp;
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

  getPosts({ sinceDay }) {
    const { edges } = this.props.posts;
    let posts = edges.filter(({ node }) => {
      let isSelected = false;
      const minTimestamp = Number(
        moment()
          .subtract(sinceDay, "day")
          .startOf("day")
          .format("x")
      );
      const date = moment(node.date).startOf("day");
      node.categories.forEach(cat => {
        if (cat.name === "Journal") {
          isSelected = true;
        }
      });
      node.timestamp = Number(date.format("x"));
      node.dateObject = {
        m: date.format("MM"),
        y: date.format("YYYY"),
        d: date.format("DD")
      };
      return isSelected === true && date >= minTimestamp;
    });
    posts = posts.map(day => day.node);
    // const days = [];
    posts = _.sortBy(posts, ["timestamp"]);
    posts.reverse();
    posts = posts.slice(0, 3);
    const group = this.groupArray({ grouper: "timestamp", array: posts });
    return group;
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

  mergeIntoDays({ posts, activities }) {
    let timestamps = _.merge(Object.keys(posts), Object.keys(activities));
    // console.log("#mergeIntoDays timestamps #1", timestamps);
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
    // console.log("pages/index#renderDay activities", activities);
    const date = post.date || activities[0].timestamp;
    return (
      <div className="col-12 col-sm-4" key={index}>
        <h2
          style={{
            textAlign: "center"
          }}
        >
          {moment(date).format("ddd MMM, Do")}
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
    const link = `en/${post.dateObject.y}/${post.dateObject.m}/${
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
    // console.log("cmp/LastDays#render days", days);
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
