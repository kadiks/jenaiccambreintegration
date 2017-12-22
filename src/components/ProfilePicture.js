import React from "react";
import Styles from "../utils/Styles";
import Icon from "./Icon";
import SocialIcon from "./SocialIcon";

import profilePicture from "../../assets/img/jenaic_cambre.jpg";

const styles = {
  border: {
    width: 146,
    height: 146,
    borderRadius: 73,
    borderColor: Styles.colors.main,
    borderStyle: "solid",
    borderWidth: 1,
    textAlign: "center",
    paddingTop: 2.5,
    marginLeft: "auto",
    marginRight: "auto"
  },
  img: {
    width: 140,
    height: 138,
    borderRadius: 70
  },
  socialIcons: {
    padding: 0,
    margin: "20px auto",
    width: 215
  },
  quote: {
    textAlign: "center",
    fontFamily: "Georgia, Times New Roman, Times, serif",
    fontStyle: "italic",
    fontSize: 14
  }
};

class ProfilePicture extends React.Component {
  renderSocialIcons() {
    const socialIcons = [
      {
        name: "twitter",
        link: "http://twitter.com/kryptonikco/"
      },
      {
        name: "youtube",
        link: "https://www.youtube.com/channel/UCk_jcw5WJA2krzIUSvixUYg"
      },
      {
        name: "linkedin",
        link: "https://www.linkedin.com/in/jenaiccambre/"
      }
    ];
    return socialIcons.map((props, index) => (
      <SocialIcon key={index} {...props} />
    ));
  }

  render() {
    return (
      <div className="col-12">
        <div style={styles.border}>
          <img src={profilePicture} style={styles.img} alt="Jénaïc Cambré" />
        </div>
        <blockquote style={styles.quote}>
          “Evolving with technology” 🍃
        </blockquote>
        <div className="row" style={styles.socialIcons}>
          {this.renderSocialIcons()}
        </div>
      </div>
    );
  }
}

export default ProfilePicture;
