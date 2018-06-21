const checkTimeSpent = async (callback, userID, role) => {
    let start = new Date();
    const callbackPromise = await callback();
    console.log(userID + " has spent " + ((new Date() - start) / 1000) + " seconds to " + role + ".");

    return callbackPromise;
};

export {checkTimeSpent};