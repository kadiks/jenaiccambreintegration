import React from "react";
import Styles from "../../utils/Styles";

class Meals extends React.Component {
  getMealsFromActivites({ activities }) {
    const meals = [0, 0, 0];
    const activitiesKeys = Object.keys(activities);
    activitiesKeys.forEach(activity => {
      // console.log(
      //   "cmp/activity/Meals#getMealsFromActivites activity",
      //   activity
      // );
      switch (activity) {
        case "breakfast":
          meals[0] = 2;
          break;
        case "snacks_as_breakfast":
          meals[0] = 1;
          break;
        case "lunch":
          meals[1] = 2;
          break;
        case "snacks_as_lunch":
          meals[1] = 1;
          break;
        case "dinner":
          meals[2] = 2;
          break;
        case "snacks_as_dinner":
          meals[2] = 1;
          break;
      }
    });
    // console.log("cmp/activity/Meals#getMealsFromActivites meals", meals);
    if (meals[0] === 0 && meals[1] === 0 && meals[2] === 0) {
      return false;
    }
    return meals;
  }

  render() {
    // console.log(">> cmp/activity/Meals#render");
    const { activities } = this.props;
    const meals = this.getMealsFromActivites({ activities });
    if (meals === false) {
      return null;
    }
    // console.log("cmp/activity/Meals#render rendering");
    return (
      <div>
        <h5 style={{ margin: "10px 0 3px" }}>Meals</h5>
        <div
          style={{
            border: `1px solid ${Styles.colors.background}`,
            height: 19,
            paddingLeft: 1,
            width: 94
          }}
        >
          {meals.map((meal, index) => {
            const backgroundColor =
              meal === 0
                ? "transparent"
                : meal === 1 ? "rgba(255, 255, 255, .5)" : "#FFF";
            return (
              <div
                key={index}
                style={{
                  width: 30,
                  height: 15,
                  display: "inline-block",
                  border: `1px solid ${Styles.colors.main}`,
                  backgroundColor
                }}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Meals;
