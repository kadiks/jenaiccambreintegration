import React from 'react';
import FlagIcon from './FlagIcon';
import Link from 'gatsby-link';
import Styles from '../../utils/Styles';

export default class FlagLink extends React.Component {
    render() {
        const { language = "fr", link = null } = this.props;
        let url = language === "fr" ? `/fr/` : `/`;
        if (link !== null) {
            url = `${url}${link}`;
        }
        const code = language === "en" ? "gb" : language; 
        return (
            <div className="col-12 col-md-8 offset-md-2">
                <div style={{
                    textAlign: "right",
                    marginTop: -14
                }}>
                    <Link to={url} style={{
                        backgroundColor: Styles.colors.main,
                        padding: '0 6px 3px',
                        borderBottomLeftRadius: 5,
                        borderBottomRightRadius: 5,
                        fontSize: 12
                    }}>
                        <FlagIcon code={code} />
                    </Link>
                </div>
            </div>
        );
    }
}