const _ = require(`lodash`);
const Promise = require(`bluebird`);
const path = require(`path`);
const slash = require(`slash`);
const moment = require("moment");
const fs = require('fs-extra');

const imagePrinter = require("./src/utils/printer/Image");
const filterPost = require("./src/utils/filters/Post");

// Implement the Gatsby API “createPages”. This is
// called after the Gatsby bootstrap is finished so you have
// access to any information necessary to programmatically
// create pages.
// Will create pages for Wordpress pages (route : /{slug})
// Will create pages for Wordpress posts (route : /post/{slug})
exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  return new Promise((resolve, reject) => {
    // The “graphql” function allows us to run arbitrary
    // queries against the local Wordpress graphql schema. Think of
    // it like the site has a built-in database constructed
    // from the fetched data that you can run queries against.

    // ==== PAGES (WORDPRESS NATIVE) ====
    graphql(
      `
        {
          allWordpressPage {
            edges {
              node {
                id
                slug
                status
                template
              }
            }
          }
        }
      `
    )
      .then(result => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        // Create Page pages.
        const pageTemplate = path.resolve(`./src/templates/page.js`);
        // We want to create a detailed page for each
        // page node. We'll just use the Wordpress Slug for the slug.
        // The Page ID is prefixed with 'PAGE_'
        _.each(result.data.allWordpressPage.edges, edge => {
          // Gatsby uses Redux to manage its internal state.
          // Plugins and sites can use functions like "createPage"
          // to interact with Gatsby.
          createPage({
            // Each page is required to have a `path` as well
            // as a template component. The `context` is
            // optional but is often necessary so the template
            // can query data specific to each page.
            path: `/${edge.node.slug}/`,
            component: slash(pageTemplate),
            context: {
              id: edge.node.id
            }
          });
        });
      })
      // ==== END PAGES ====

      // ==== POSTS (WORDPRESS NATIVE AND ACF) ====
      .then(() => {
        graphql(
          `
            {
              allWordpressPost {
                edges {
                  node {
                    id
                    date
                    slug
                    title
                    status
                    template
                    format
                    tags {
                      name
                    }
                  }
                }
              }
            }
          `
        ).then(async result => {
          if (result.errors) {
            console.log(result.errors);
            reject(result.errors);
          }
          const postTemplate = path.resolve(`./src/templates/post.js`);
          // We want to create a detailed page for each
          // post node. We'll just use the Wordpress Slug for the slug.
          // The Post ID is prefixed with 'POST_'
          // _.each(result.data.allWordpressPost.edges, async edge => {
          //   // console.log("gatsby-node results", edge);
          //   const date = edge.node.date;
          //   const slug = edge.node.slug;
          //   const tags = edge.node.tags || [];
          //   const daySlug = getDaySlug({ slug, date, tags });
          //   const post = filterPost.getTransformedPost({ post: edge.node });

          //   // await imagePrinter.printSocialMediaCard({
          //   //   post,
          //   // });
            
          //   createPage({
          //     path: daySlug,
          //     component: slash(postTemplate),
          //     context: {
          //       id: edge.node.id
          //     }
          //   });
          // });
          const translationPostMap = [];
          await Promise.all(result.data.allWordpressPost.edges.map(async (edge) => {
            // console.log("gatsby-node results", edge);
            const date = edge.node.date;
            const slug = edge.node.slug;
            const tags = edge.node.tags || [];
            const daySlug = getDaySlug({ slug, date, tags });
            const post = filterPost.getTransformedPost({ post: edge.node });

            // const translatedPost = filterPost.getJournalPostInOtherLanguage({
            //   post: edge.node,
            //   posts: result.data.allWordpressPost
            // });

            // console.log("translatedPost", translatedPost)

            // if (translatedPost !== null) {
            //   const translationEntry = {};
            //   translationEntry[post.language] = post.url;
            //   translationEntry[translatedPost.language] = translatedPost.url;
            //   translationPostMap.push(translationEntry);
            // }

            // await imagePrinter.printSocialMediaCard({
            //   post,
            // });
            
            createPage({
              path: daySlug,
              component: slash(postTemplate),
              context: {
                id: edge.node.id
              }
            });
          }));
          // console.log("translationPostMap.length", translationPostMap.length);
          // await fs.writeFile("./translationmap.json", JSON.stringify(translationPostMap, null, 2), 'utf8');
          resolve();
        });
      });
    // ==== END POSTS ====
  });
};

const getDaySlug = ({ date, slug, tags = [] }) => {
  const tagsNames = tags.map(t => t.name);
  // console.log("#getDaySlug tagsNames", tagsNames);
  const language = tagsNames.includes("french") ? "fr" : "en";
  const y = moment(date).format("YYYY");
  const m = moment(date).format("MM");
  const d = moment(date).format("DD");
  return `${language}/${y}/${m}/${d}/${slug}`;
};
