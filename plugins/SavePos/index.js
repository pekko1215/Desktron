module.exports = function SavePos(handler, config) {
    this.config = config
    this.handler = handler
    $ = handler.$
    var win = remote.getCurrentWindow();
    if (handler.localStorage.getItem("windowPosition")) {
        var pos = JSON.parse(handler.localStorage.getItem("windowPosition"));
        window.moveTo(...pos);
    }
    win.on('move', function(){
        handler.localStorage.setItem("windowPosition", JSON.stringify([window.screenX,window.screenY]));
    })
}

module.exports.prototype.menu = function(){
    var menu = {
        label: "SavePos",
        enabled: false
    }
    return menu
}