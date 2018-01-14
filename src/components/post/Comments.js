import React from 'react';

export default class Comments extends React.Component {
    render() {
        const { language = "en" } = this.props;
        const comment = {
            "fr": `<p>Commentaires fermés. Commentez sur une de mes photos <a href="https://instagram.com/jenaiccambre/" target="_blank">Instagram</a> à la place.</p>`,
            "en": `<p>Comments are closed. Comment on one of my <a href="https://instagram.com/jenaiccambre/" target="_blank">Instagram</a> post instead.</p>`
        };
        return (
            <div className="col12 col-md-8 offset-md-2" dangerouslySetInnerHTML={{
                __html: comment[language]
            }} />
        );
    }
} 