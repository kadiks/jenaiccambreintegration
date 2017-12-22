import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import Helmet from "react-helmet";
// import "bootstrap/dist/css/bootstrap-reboot.css";
import "bootstrap/dist/css/bootstrap-grid.css";
import "../../assets/css/styles.css";
import "../../assets/css/fontawesome.css";

// import { rhythm, scale } from "../utils/typography";
import Styles from "../utils/Styles";
import favicon from "../../assets/img/favicon.ico";

// const containerStyle = {
//   maxWidth: 700,
//   margin: `0 auto`,
//   padding: rhythm(3 / 4)
// };

const styles = {
  topBar: Styles.topBar
};

class DefaultLayout extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <link rel="shortcut icon" href={favicon} />
        </Helmet>
        <div style={styles.topBar} />
        <div className="container-fluid">
          {/* <div className="col-12 col-md-8 offset-md-2"> */}
          {this.props.children()}
          {/* </div> */}
        </div>
      </div>
    );
    return (
      <div>
        <div
          css={{
            background: `rgb(207, 58, 62)`,
            marginBottom: rhythm(1),
            padding: `${rhythm(1)} 0px`,
            "@media screen and (min-width: 500px)": {
              padding: `${rhythm(2)} 0px`
            }
          }}
        >
          <div css={containerStyle}>
            <h1
              css={{
                margin: 0,
                fontSize: scale(1.5).fontSize,
                lineHeight: 1,
                "@media screen and (min-width: 500px)": {
                  fontSize: scale(1.9).fontSize,
                  lineHeight: 1
                }
              }}
            >
              <Link
                css={{
                  color: `rgb(224,203,144)`,
                  ":hover": {
                    color: `rgb(224,203,144)`,
                    textDecoration: `none`
                  }
                }}
                to="/"
              >
                Gatsby + Wordpress!!
              </Link>
            </h1>
          </div>
        </div>
        <div css={containerStyle}>{this.props.children()}</div>
      </div>
    );
  }
}

DefaultLayout.propTypes = {
  location: PropTypes.object.isRequired
};

export default DefaultLayout;
