import React from 'react';
import Footer from './FooterIndex';
import Styles from '../../utils/Styles';

export default class FooterKyeda extends React.Component {
    render() {
        const { language = "en" } = this.props;
        const data = {
            name: "Kyeda",
            colors: [Styles.colors.kyeda, "#fbeccf"],
            link: "http://kyeda.com/",
            text: language === "en" ? "Self-help app. Click to register to beta testing" : "Application de développement personnel. Cliquez pour participer au beta test"
        };
        return <Footer data={data} language={this.props.language} />
    }
} 