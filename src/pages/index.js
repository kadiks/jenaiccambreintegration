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

class Home extends Component {
  renderFooter() {
    const footers = [
      {
        name: "Kryptonik",
        colors: [Styles.colors.kryptonik, Styles.colors.tertiary],
        link: "http://kryptonik.net/",
        text: "My company"
      },
      {
        name: "Kyeda",
        colors: [Styles.colors.kyeda, "#fbeccf"],
        link: "/",
        text: "Self-help app. Coming soon..."
      }
    ];
    return footers.map((footer, index) => {
      return (
        <div
          key={index}
          className="col-12"
          style={{
            backgroundColor: footer.colors[0],
            color: footer.colors[1],
            textAlign: "center",
            height: 200,
            paddingTop: 50
          }}
        >
          <h4>
            <a
              style={{
                fontFamily: "Raleway",
                textDecoration: "none",
                color: footer.colors[1]
              }}
              href={footer.link}
            >
              {footer.name}
            </a>
          </h4>
          <p>{footer.text}</p>
        </div>
      );
    });
  }

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
        <div className="col-12" style={{ marginTop: 20 }} />
        <ProfilePicture />
        <div className="col-12" style={{ marginTop: 20 }} />
        <div
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
        {this.renderFooter()}
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
