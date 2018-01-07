import React from "react";

class Artistic extends React.Component {
  getArtisticsFromActivities({ activities }) {
    const activitiesKeys = Object.keys(activities);
    const artistics = [];
    activitiesKeys.forEach(activity => {
      switch (activity) {
        case "play_guitar":
        case "guitar_class":
          artistics.push(`🎸`);
          break;
        case "improv":
        case "improv_show":
          artistics.push(`🎭`);
          break;
        case "salsa_class":
          artistics.push(`💃`);
          break;
        case "take_photos":
          artistics.push(`📸`);
          break;
      }
    });
    return artistics;
  }

  render() {
    const { activities, language } = this.props;
    const artistics = this.getArtisticsFromActivities({ activities });
    if (artistics.length === 0) {
      return null;
    }
    const artisticText = language === "en" ? "Artistic" : "Artistique";
    return (
      <div>
        <h5 style={{ margin: "10px 0 3px" }}>{artisticText}</h5>
        {artistics.map((a, index) => <span key={index}>{a}</span>)}
      </div>
    );
  }
}

export default Artistic;
