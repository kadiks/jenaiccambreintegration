import React, { Component } from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import moment from "moment";
import _ from "lodash";
import Helmet from "react-helmet";

// import PostIcons from "../components/PostIcons";
import Styles from "../../utils/Styles";
import ProfilePicture from "../../components/ProfilePicture";
import Activities from "../../components/activity";
// import { rhythm } from "../utils/typography";
import LastDays from "../../components/LastDays";
import LinkFlag from "../../components/flags/Link";
import filterPost from "../../utils/filters/Post";
import EntryItem from "../../components/post/EntryItem";
import HomeLink from "../../components/post/HomeLink";

const LANGUAGE = "fr";


class Entries extends Component {
  render() {
    const data = this.props.data;
    // console.log("pages/index#render data", this.props.data);
    const posts = filterPost.getJournalPostsByLanguage({
        posts: data.allWordpressPost,
        language: LANGUAGE
    });
    return (
      <div className="row">
        <Helmet>
          <title>
            {data.site.siteMetadata.title} - {data.site.siteMetadata.subtitle}
          </title>
        </Helmet>
        <LinkFlag link="entries" language={"en"} />
        <div className="col-12 col-md-8 offset-md-2">
            <HomeLink language={LANGUAGE} />
            <h1 style={{
                color: Styles.colors.main
            }}>Articles</h1>
            <ul style={{
                paddingLeft: 0
            }}>
            {posts.map((post, index) =>
                <EntryItem post={post} language={LANGUAGE} key={index} />
            )}
            </ul>
        </div>
      </div>
    );
  }
}

export default Entries;


export const pageQuery = graphql`
  query frEntriesPageQuery {
    allWordpressPost(sort: { fields: [date], order: DESC }) {
      edges {
        node {
          title
          excerpt
          slug
          date
          categories {
            id
            name
          }
          tags {
            id
            name
          }
        }
      }
    }
    allPhoenixDaily(sort: { fields: [day], order: DESC }) {
      edges {
        node {
          slug
          day
        }
      }
    }
    site {
      siteMetadata {
        title
        subtitle
      }
    }
  }
`;
