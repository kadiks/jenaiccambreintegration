import React from 'react';

class Footer extends React.Component {
    render() {
        const { language = "en", data = {} } = this.props;
        const footer = data;
        return (
            <div
                className="col-12"
                style={{
                    backgroundColor: footer.colors[0],
                    color: footer.colors[1],
                    textAlign: "center",
                    height: 200,
                    paddingTop: 50
                }}
                >
                <a
                    style={{
                        fontFamily: "Raleway",
                        textDecoration: "none",
                        color: footer.colors[1]
                    }}
                    href={footer.link}
                    target="_blank"
                >
                    <h4 style={{ color: footer.colors[1] }}>
                        {footer.name}
                    </h4>
                    <p>{footer.text}</p>
                </a>
            </div>
        );
    }
}

export default Footer;