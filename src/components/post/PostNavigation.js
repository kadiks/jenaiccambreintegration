import React from "react";
import Link from "gatsby-link";
import moment from "moment";
import _ from "lodash";

import Styles from "../../utils/Styles";

import Icon from "../Icon";

class PostNavigation extends React.Component {
  getNextDaysPosts() {
    const { posts, date } = this.props;
    const todayTimestamp = moment(this.props.date).startOf("day");
    const yesterdayTimestamp = todayTimestamp.subtract(1, "day").format("x");
    const tomorrowTimestamp = todayTimestamp.add(2, "day").format("x");
    let filteredPosts = posts.edges.filter(({ node }) => {
      const postDate = moment(node.date)
        .startOf("day")
        .format("x");
      node.dateObject = {
        m: moment(node.date).format("MM"),
        y: moment(node.date).format("YYYY"),
        d: moment(node.date).format("DD")
      };
      node.timestamp = Number(todayTimestamp.format("x"));
      return postDate === tomorrowTimestamp || postDate === yesterdayTimestamp;
    });
    filteredPosts = filteredPosts.map(day => day.node);
    filteredPosts = _.sortBy(filteredPosts, ["timestamp"]);
    // filteredPosts.reverse();
    // console.log(
    //   "cmp/PostNavigation#getNextDaysPosts filteredPosts",
    //   filteredPosts
    // );
    if (filteredPosts.length === 1) {
      return [null, filteredPosts[0]];
    }
    return filteredPosts;
  }

  renderPost({ post, index }) {
    const styles = {
      header: {
        color: Styles.colors.main,
        margin: "3px 0"
      },
      text: {
        textAlign: index === 0 ? "left" : "right"
      },
      paragraph: {
        margin: "3px 0",
        textTransform: "uppercase",
        fontSize: "0.6em",
        color: Styles.colors.body
      }
    };
    // console.log("cmp/post/PostNavigation post", post);
    if (post === null) {
      return <div key={index} className="col-6" />;
    }
    return (
      <div className="col-6" key={index} style={{ marginBottom: 30 }}>
        <Link
          to={`en/${post.dateObject.y}/${post.dateObject.m}/${
            post.dateObject.d
          }/${post.slug}`}
          css={[{ textDecoration: "none" }, styles.text]}
        >
          <p css={styles.paragraph}>
            <Icon name={index === 0 ? "caret-left" : ""} />
            {index === 0 ? "Next" : "Previous"} article<Icon
              name={index === 0 ? "" : "caret-right"}
            />
          </p>
          <h4 css={styles.header}>{post.title}</h4>
        </Link>
      </div>
    );
  }

  render() {
    const posts = this.getNextDaysPosts();
    return (
      <div className="col-12 col-sm-8 offset-sm-2">
        <div className="row">
          {posts.map((post, index) => this.renderPost({ post, index }))}
        </div>
      </div>
    );
  }
}

export default PostNavigation;
