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
        label: "サスペンド",
        click: () => {
            childProcess.exec('%windir%\\System32\\rundll32.exe powrprof.dll,SetSuspendState')
        }
    }
    return menu
}