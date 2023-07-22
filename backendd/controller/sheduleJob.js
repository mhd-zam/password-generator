const schedule = require("node-schedule");
const sharedlist = require("../model/sharedlist");

schedule.scheduleJob("0 0 * * *", async () => {
  let currentDate = new Date();
  currentDate = currentDate.toISOString().slice(0, 10);
  await sharedlist.updateMany(
    { "sharedList.validity": { $eq: currentDate } },
    { $pull: { sharedList: { validity: currentDate } } }
  );
  console.log("worked");
});

console.log("consoled");
