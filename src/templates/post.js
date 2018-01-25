import React, { Component } from "react";
import PropTypes from "prop-types";
import Img from "gatsby-image";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import styled from "styled-components";
import moment from "moment";
import Entities from 'html-entities';

import Styles from "../utils/Styles";

import Icon from "../components/Icon";
import LastDays from "../components/LastDays";
import PostNavigation from "../components/post/PostNavigation";
import OtherLanguagePost from "../components/post/OtherLanguagePost";
import HomeLink from "../components/post/HomeLink";
import Comments from "../components/post/Comments";
import filterPost from '../utils/filters/Post';
import ImagePost from "../components/post/Image";

const headersStyle = {};
for (let i = 0; i < 6; i++) {
  const header = `h${i + 1}`;
  headersStyle[`& ${header}`] = {
    color: Styles.colors.main
  };
}

const styles = {
  headers: headersStyle,
  quote: {
    "& blockquote": {
      fontWeight: "bold",
      fontStyle: "italic",
      borderLeft: `3px solid ${Styles.colors.main}`,
      backgroundColor: "rgba(185, 0, 0, .1)",
      margin: "10px 0",
      paddingLeft: 40,
      paddingTop: "1.5em",
      paddingBottom: "1.5em",
      position: "relative"
    },
    "& blockquote::before": {
      // https://codepen.io/maxds/pen/DcveB
      content: "\\201C",

      /*Font*/
      fontFamily: "Georgia, serif",
      fontSize: 60,
      fontWeight: "bold",
      color: "#AAA",

      /*Positioning*/
      position: "absolute",
      left: 5,
      top: 5
    },
    "& blockquote > *": {
      margin: 0
    }
  }
};

class PostTemplate extends Component {
  constructor(props) {
    super(props);

    this.entities = new Entities.AllHtmlEntities();
  }
  render() {
    console.log("templates/post#render this.props", this.props);
    const {
      wordpressPost,
      site,
      allWordpressPost,
      allPhoenixDaily
    } = this.props.data;
    const language = this.props.location.pathname.slice(1, 3);
    moment.locale(language);
    const post = filterPost.getTransformedPost({ post: wordpressPost });
    const title = this.entities.decode(post.title);

    return (
      <div>
        <Helmet>
          <title>
            {title} | {site.siteMetadata.title} -
            {site.siteMetadata.subtitle}
          </title>

          {/* <!--  Essential META Tags --> */}

          <meta property="og:title" content={title} />
          <meta property="og:description" content={`${post.excerpt.slice(0,197)}...`} />
          <meta property="og:image" content={`http://jenaiccambre.com/static/${post.url}.png`} />
          <meta property="og:url" content={`http://jenaiccambre.com/${post.url}`} />
          <meta name="twitter:card" content="summary_large_image" />


          {/* <!--  Non-Essential, But Recommended --> */}

          <meta property="og:site_name" content={site.siteMetadata.title} />
          <meta name="twitter:image:alt" content="Alt text for image" />


          {/* <!--  Non-Essential, But Required for Analytics --> */}

          {/* <meta property="fb:app_id" content="your_app_id" /> */}
          <meta name="twitter:site" content={language === "en" ? "@kadiks" : "@jenaiccambre"} />
        </Helmet>
        <div className="col-12 col-md-8 offset-md-2">
          <HomeLink language={language} />
          <small>{moment(post.date).format(language === "en" ? "ddd, Do MMM YYYY" : "dddd D MMM YYYY")}</small>
          <ImagePost post={post} />
          <h1
            style={{ color: Styles.colors.main, fontSize: "2.5em" }}
            dangerouslySetInnerHTML={{ __html: post.title }}
          />
          <OtherLanguagePost language={language} posts={allWordpressPost} post={post} />
          <div
            css={[styles.headers, styles.quote]}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <div className="col-12" style={{ marginTop: 70 }} />
        </div>
        <PostNavigation posts={allWordpressPost} post={post} language={language} />
        <Comments language={language} />
        <div
          className="row"
          style={{
            backgroundColor: Styles.colors.main,
            color: Styles.colors.background
          }}
        >
          <div className="col-12 col-md-8 offset-md-2">
            <LastDays activities={allPhoenixDaily} posts={allWordpressPost} language={language} />
          </div>
          <div className="col-12" style={{ marginTop: 30 }} />
        </div>
      </div>
    );
    return (
      <div>
        <h1 dangerouslySetInnerHTML={{ __html: post.title }} />
        <PostIcons node={post} css={{ marginBottom: rhythm(1 / 2) }} />
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
        {post.acf &&
          post.acf.page_builder_post &&
          post.acf.page_builder_post.map((layout, i) => {
            if (layout.__typename === `WordPressAcf_image_gallery`) {
              return (
                <div key={`${i} image-gallery`}>
                  <h2>ACF Image Gallery</h2>
                  {layout.pictures.map(({ picture }) => {
                    const img = picture.localFile.childImageSharp.sizes;
                    return (
                      <Img
                        css={{ marginBottom: rhythm(1) }}
                        key={img.src}
                        sizes={img}
                      />
                    );
                  })}
                </div>
              );
            }
            if (layout.__typename === `WordPressAcf_post_photo`) {
              const img = layout.photo.localFile.childImageSharp.sizes;
              return (
                <div key={`${i}-photo`}>
                  <h2>ACF Post Photo</h2>
                  <Img
                    css={{ marginBottom: rhythm(1) }}
                    src={img.src}
                    sizes={img}
                  />
                </div>
              );
            }
            return null;
          })}
      </div>
    );
  }
}
//<img src={post.image.sizes.thumbnail} />

PostTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  edges: PropTypes.array
};

export default PostTemplate;

// export const pageQuery = graphql`
// query currentPostQuery($id: String!) {
//   wordpressPost(id: { eq: $id }) {
//     title
//     content
//     ...PostIcons
//     acf {
//       page_builder_post {
//         __typename
//         ... on WordPressAcf_post_photo {
//           photo {
//             localFile {
//               childImageSharp {
//                 sizes(maxWidth: 680) {
//                   ...GatsbyImageSharpSizes
//                 }
//               }
//             }
//           }
//         }
//         ... on WordPressAcf_image_gallery {
//           pictures {
//             picture {
//               localFile {
//                 childImageSharp {
//                   sizes(maxWidth: 680) {
//                     ...GatsbyImageSharpSizes
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
//   site {
//     siteMetadata {
//       title
//       subtitle
//     }
//   }
// }
// `
export const pageQuery = graphql`
  query currentPostQuery($id: String!) {
    wordpressPost(id: { eq: $id }) {
      title
      content
      excerpt
      slug
      date
      tags {
        id
        name
      }
      featured_media {
        id
        link
        localFile {
          childImageSharp {
            sizes(maxWidth: 680) {
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
    }
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
