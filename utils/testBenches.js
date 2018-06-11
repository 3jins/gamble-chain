const checkTimeSpent = (callback, userID, role) => {
    let start = new Date();
    callback();
    console.log(userID + " has spent " + ((new Date() - start) / 1000) + " seconds to " + role + ".");
};

export {checkTimeSpent};