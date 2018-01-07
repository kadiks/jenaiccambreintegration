import React from "react";

import Meals from "./Meals";
import Artistic from "./Artistic";
import Drinks from "./Drinks";
import MorningRoutine from "./MorningRoutine";

class Activity extends React.Component {
  render() {
    // console.log(">> cmp/activity#render");
    const { activities, language = "en" } = this.props;
    return (
      <div>
        <Meals activities={activities} language={language} />
        <Artistic activities={activities} language={language} />
        <Drinks activities={activities} language={language} />
        <MorningRoutine activities={activities} language={language} />
      </div>
    );
  }
}

export default Activity;
