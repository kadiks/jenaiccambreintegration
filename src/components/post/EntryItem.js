import React from "react";
import moment from "moment";
import "moment/min/locales.min";
import Link from "gatsby-link";

import Styles from "../../utils/Styles";

class EntryItem extends React.Component {
    render() {
        const { post, language = "en" } = this.props;
        moment.locale(language);
        return (
            <li style={{
                listStyleType: "none",
                borderBottom: `1px solid ${Styles.colors.secondary}`
            }}>
                <p>{moment(post.date).format(language === "en" ? "ddd, Do MMM YYYY" : "ddd DD MMM YYYY")}</p>
                <h2 style={{
                    color: Styles.colors.main
                }}>
                    <Link
                        to={post.url}
                        style={{
                            color: Styles.colors.main,
                            textDecoration: "none"
                        }}
                        dangerouslySetInnerHTML={{ __html: post.title }} />
                </h2>
            </li>
        );
    }
}

export default EntryItem;