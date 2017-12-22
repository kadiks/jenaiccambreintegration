import React from "react";
import Icon from "./Icon";
import Styles from "../utils/Styles";

class SocialIcon extends React.Component {
  render() {
    const { link, name } = this.props;
    return (
      <div className="col">
        <a
          href={link}
          target="_blank"
          style={{
            color: Styles.colors.main
          }}
        >
          <Icon name={name} />
        </a>
      </div>
    );
  }
}

export default SocialIcon;
