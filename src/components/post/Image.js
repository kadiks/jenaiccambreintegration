import React from "react";
import Img from "gatsby-image";
import _ from "lodash";

class ImagePost extends React.Component {
    render() {
        const { post } = this.props;
        const sizes = _.get(post, "featured_media.localFile.childImageSharp.sizes", null);
        if (sizes === null) {
            return null;
        }
        return (
            <Img sizes={sizes} />
        );
    }
}

export default ImagePost;