import React from 'react';
import Styles from "../../utils/Styles";
import Link from "gatsby-link";

class HomeLink extends React.Component {
    render() {
        const { language = "en" } = this.props;
        return (
            <Link
                to={language === "en" ? "/" : "/fr"}
                css={{
                color: Styles.colors.main,
                ":hover": { color: Styles.colors.main },
                ":visited": { color: Styles.colors.main }
                }}
            >
                <i className="fa fa-home" style={{ color: Styles.colors.main }} />
            </Link>
        );
    }
}

export default HomeLink;