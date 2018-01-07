import React, { Component } from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import moment from "moment";
import _ from "lodash";
import Helmet from "react-helmet";

// import PostIcons from "../components/PostIcons";
import Styles from "../utils/Styles";
import ProfilePicture from "../components/ProfilePicture";
import Activities from "../components/activity";
// import { rhythm } from "../utils/typography";
import LastDays from "../components/LastDays";
import FooterKyeda from '../components/footer/FooterKyeda';
import FooterKryptonik from '../components/footer/FooterKryptonik';
import LinkFlag from "../components/flags/Link";

class Home extends Component {
  render() {
    const data = this.props.data;
    // console.log("pages/index#render data", this.props.data);
    return (
      <div className="row">
        <Helmet>
          <title>
            {data.site.siteMetadata.title} - {data.site.siteMetadata.subtitle}
          </title>
        </Helmet>
        <LinkFlag />
        <div className="col-12" style={{ marginTop: 20 }} />
        <ProfilePicture />
        <div className="col-12" style={{ marginTop: 20 }} />
        <div
          className="col-12"
          style={{
            backgroundColor: Styles.colors.main,
            color: Styles.colors.tertiary,
            padding: "10px 0 35px"
          }}
        >
          <div className="col-12 col-md-8 offset-md-2">
            <LastDays
              posts={data.allWordpressPost}
              activities={data.allPhoenixDaily}
            />
          </div>
        </div>
        <FooterKyeda />
        <FooterKryptonik />
      </div>
    );
    return (
      <div>
        {/* <div css={{ marginBottom: rhythm(1) }}>
          <h1>Pages</h1>
          {data.allWordpressPage.edges.map(({ node }) => (
            <div key={node.slug}>
              <Link to={node.slug} css={{ textDecoration: `none` }}>
                <h3>{node.title}</h3>
              </Link>
              <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
              <span>
                <ClockIcon
                  size={14}
                  css={{ position: `relative`, bottom: 1 }}
                />
                {` `}
                {node.date}
              </span>
            </div>
          ))}
        </div>
        <hr /> */}
        {/* {data.allWordpressPost.edges.map(({ node }) => (
          <div css={{ marginBottom: rhythm(2) }} key={node.slug}>
            <Link to={node.slug} css={{ textDecoration: `none` }}>
              <h3>{node.title}</h3>
            </Link>
            <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
            {node.categories.map(category => (
              <div
                dangerouslySetInnerHTML={{
                  __html: category.name
                }}
              />
            ))}
            <div dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }} />

            <PostIcons node={node} />
          </div>
        ))} */}
        {this.renderLast3Days()}
      </div>
    );
  }
}

export default Home;

// Set here the ID of the home page.
// export const pageQuery = graphql`
//   query homePageQuery {
//     allWordpressPage {
//       edges {
//         node {
//           id
//           title
//           excerpt
//           slug
//           date(formatString: "MMMM DD, YYYY")
//         }
//       }
//     }
//     allWordpressPost(sort: { fields: [date] }) {
//       edges {
//         node {
//           title
//           excerpt
//           slug
//           ...PostIcons
//         }
//       }
//     }
//   }
// `

export const pageQuery = graphql`
  query homePageQuery {
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
