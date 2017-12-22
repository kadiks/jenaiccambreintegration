import React from "react";

import Meals from "./Meals";
import Artistic from "./Artistic";
import Drinks from "./Drinks";
import MorningRoutine from "./MorningRoutine";

class Activity extends React.Component {
  render() {
    // console.log(">> cmp/activity#render");
    const { activities } = this.props;
    return (
      <div>
        <Meals activities={activities} />
        <Artistic activities={activities} />
        <Drinks activities={activities} />
        <MorningRoutine activities={activities} />
      </div>
    );
  }
}

export default Activity;
