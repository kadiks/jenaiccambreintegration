import moment from 'moment';
import Limits from './Limits';

class Activity {
    getActivities({ activities }) {
        const { edges } = activities;
        const { minTimestamp, maxTimestamp } = Limits();
        
        let filteredActivities = edges.filter(({ node }) => {
            const date = moment(node.day);
            node.timestamp = Number(date.format('x'));
            // console.log("#getActivities date", node.timestamp, minTimestamp, maxTimestamp);
            return node.timestamp <= maxTimestamp && node.timestamp >= minTimestamp;
        });
        filteredActivities = filteredActivities.map(day => day.node);
        filteredActivities = _.sortBy(filteredActivities, ["day"]);
        filteredActivities.reverse();
        return filteredActivities;
    }
}

export default new Activity();
