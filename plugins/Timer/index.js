module.exports = function Timer(handler, config) {
    this.config = config
    this.handler = handler
    $ = handler.$
}

module.exports.prototype.Regist = function() {
    var firstMessage = this.handler.pushMessage(this.config.message.reservation);
    var $timer = $('<div></div>')
    var $input = $('<input></input>')
    var $button = $('<input type="button" value="'+this.config.message.ui.set+'"></input>');
    $timer.append($input)
    $timer.append($button);

    var form = this.handler.pushMessage($timer)
    var that = this
    function input(){
		var text = $input.val()
		that.handler.deleteMessage(firstMessage)
		that.handler.deleteMessage(form)
		that.handler.pushMessage(that.config.message.reservated.replace("%s",text))
    }

    $input.on('keydown',(e)=>{
		if(e.keyCode === 13)
			input()
    })
    $button.on('click',()=>{
		input()
    })
}

module.exports.prototype.menu = function() {
    var that = this
    var menu = {
        label: "Timer",
        submenu: [{
            label: "登録",
            click: () => { that.Regist() }
        }]
    }
    return menu
}