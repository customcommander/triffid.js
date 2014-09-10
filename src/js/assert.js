
T.Assert = {
    isTrue: function (value, message) {
        if (value !== true) {
            throw new Error(message);
        }
    }
};
