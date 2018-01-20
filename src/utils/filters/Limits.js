const moment = require("moment");

const endDay = 31;
const startDate = moment([2017, 11, 5]);

const PUBLISH_TIME = 18;


module.exports = () => {
    return {
        minTimestamp: Number(startDate.format('x')),
        maxTimestamp: Number(
            moment()
            .subtract(endDay, "day")
            .subtract(PUBLISH_TIME, "hour")
            .startOf("day")
            .format("x")
        )
    }
}