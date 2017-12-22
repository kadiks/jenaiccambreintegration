import React from "react";

class Drinks extends React.Component {
  getDrinksFromActivities({ activities }) {
    const activitiesKeys = Object.keys(activities);
    const items = [];
    activitiesKeys.forEach(activity => {
      let item = "";
      const actNum = activities[activity];
      switch (activity) {
        case "glass_water":
          item = "💧";
          break;
        case "cup_tea":
          item = "🍵";
          break;
        case "glass_other":
          item = "🍹";
          break;
      }
      // console.log("item.length", item.length);
      if (item.length !== 0) {
        if (actNum > 1) {
          item = `${item}<small>(x${actNum})</small>`;
        }
        items.push(item);
      }
    });

    return items;
  }

  render() {
    const { activities } = this.props;
    const drinks = this.getDrinksFromActivities({ activities });
    if (drinks.length === 0) {
      return null;
    }
    return (
      <div>
        <h5 style={{ margin: "10px 0 3px" }}>Drinks</h5>
        {drinks.map((d, index) => (
          <span key={index} dangerouslySetInnerHTML={{ __html: d }} />
        ))}
      </div>
    );
  }
}

export default Drinks;
