import React from 'react';
import Footer from './FooterIndex';
import Styles from '../../utils/Styles';

export default class FooterKryptonik extends React.Component {
    render() {
        const { language = "en" } = this.props;
        const data = {
            name: "Kryptonik",
            colors: [Styles.colors.kryptonik, Styles.colors.tertiary],
            link: "",
            text: language === "en" ? "My company. Website coming soon" : "Mon entreprise. Site en construction" 
        };
        return <Footer data={data} language={language} />
    }
} 