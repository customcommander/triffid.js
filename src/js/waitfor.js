
function WaitFor(cond, repeat, fn, context) {
    this.cond    = cond;
    this.repeat  = repeat || 50;
    this.fn      = fn || function () {};
    this.context = context || window;
}
