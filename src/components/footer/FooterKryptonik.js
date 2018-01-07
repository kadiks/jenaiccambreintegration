import React from 'react';
import Footer from './FooterIndex';
import Styles from '../../utils/Styles';

export default class FooterKryptonik extends React.Component {
    render() {
        const { language = "en" } = this.props;
        const data = {
            name: "Kryptonik",
            colors: [Styles.colors.kryptonik, Styles.colors.tertiary],
            link: "http://kryptonik.net/",
            text: language === "en" ? "My company" : "Mon entreprise" 
        };
        return <Footer data={data} language={language} />
    }
} 