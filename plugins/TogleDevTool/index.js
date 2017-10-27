const childProcess = require('child_process');

module.exports = function Suspend(handler, config) {
    this.config = config
    this.handler = handler
    $ = handler.$
    this.exeing = false;
}

module.exports.prototype.menu = function() {
    var that = this
    var menu = {
        label: "ToggleDevTool",
        click: () => {
            const win = that.handler.remote.getCurrentWindow();
            win.toggleDevTools()
        }
    }
    return menu
}