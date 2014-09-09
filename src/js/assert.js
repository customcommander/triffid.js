
T.Assert = {
    isTrue: function (expected, message) {
        if (expected !== true) {
            throw new Error(message);
        }
    }
};
