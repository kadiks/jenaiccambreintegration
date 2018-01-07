import React from "react";

class MorningRoutine extends React.Component {
  getItemsFromActivities({ activities }) {
    const activitiesKeys = Object.keys(activities);
    const items = [];
    activitiesKeys.forEach(activity => {
      let item = "";
      switch (activity) {
        case "meditation_30":
          item = "😇";
          break;
        case "reading_15":
          item = "📖";
          break;
        case "push_ups_50":
        case "planche_1":
        case "abs_50":
        case "push_ups_50_x_3":
        case "planche_1_x_3":
        case "abs_50_x_3":
          item = "💪🏾";
          break;
      }
      if (item.length !== 0) {
        if (item === "💪🏾" && items.includes("💪🏾") === false) {
          items.push(item);
        }
        if (item !== "💪🏾") {
          items.push(item);
        }
      }
    });

    return items;
  }
  render() {
    const { activities, language } = this.props;
    const items = this.getItemsFromActivities({ activities });
    if (items.length === 0) {
      return null;
    }
    const routineText = language === "en" ? "Morning routine" : "Routine matinale";
    return (
      <div>
        <h5 style={{ margin: "10px 0 3px" }}>{routineText}</h5>
        {items.map((i, index) => <span key={index}>{i}</span>)}
      </div>
    );
  }
}

export default MorningRoutine;
