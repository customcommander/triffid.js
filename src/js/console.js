
/**
 * Browser Console
 *
 * @module Triffid
 * @class Triffid.BrowserConsole
 * @constructor
 */
function BrowserConsole() {
    //@TODO if window.console doesn't exist, create one with empty functions.
}

BrowserConsole.prototype = {

    info: function (msg) {
        console.info(msg);
    },

    pass: function (msg) {
        console.log(msg);
    },

    fail: function (msg) {
        console.error(msg);
    },

    group: function (msg) {
        console.group(msg);
    },

    groupEnd: function () {
        console.groupEnd();
    }
};
