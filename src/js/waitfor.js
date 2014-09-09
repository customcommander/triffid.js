
function WaitFor(cond, repeat, fn, context) {
    this.cond    = cond;
    this.repeat  = repeat || 50;
    this.fn      = fn || function () {};
    this.context = context || window;
}

T.WaitFor = WaitFor;

T.waitFor = function (cond, repeat, fn, context) {
    throw new WaitFor(cond, repeat, fn, context);
};
