const LogModal = require('../models/LogModal');

const addLog = async (userId, action, details = null) => {
    if (!userId) {
        return { message: "userId is required" };
    }
    if (!action) {
        return { message: "action value is required" };
    }

    try {
        const newLog = new LogModal({
            userId: userId,
            action: action,
            details: details
        });
        await newLog.save();

        return { success: true, message: "Log created successfully" };
    } catch (error) {
        return { success: false, message: "Error creating log" };
    }
};

module.exports = {
    addLog
};
