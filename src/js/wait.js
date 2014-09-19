
function Wait(fn, delay, context) {
    this.fn      = fn;
    this.delay   = delay;
    this.context = context;
}

T.wait = function (fn, delay, context) {
    throw new Wait(fn, delay, context);
};
