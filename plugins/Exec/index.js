const childProcess = require('child_process');

module.exports = function Timer(handler, config) {
    this.config = config
    this.handler = handler
    $ = handler.$
    this.exeing = false;
}

module.exports.prototype.menu = function() {
    var that = this
    var menu = {
        label: this.config.label,
        submenu: []
    }
    menu.submenu = this.config.menu.map((d) => {
        return {
            label: d.label,
            click: () => {
                that.exeing == false && that.exec(d.click)
            }
        }
    })
    return menu
}

module.exports.prototype.exec = function(filename) {
    var that = this;
    var fname = filename.split(' ')[0];
    var options = filename.split(' ').splice(1);
    var pro = childProcess.spawn(fname, options.length == 0 ? undefined : options);
    pro.on('exit', () => {
        that.exeing = false;
    })
    pro.stdout.setEncoding('utf-8');
    pro.stdout.on('data', (data) => {
        var t = data.slice(-2);
        var inputFlag = false;
        if (t === "->") {
            inputFlag = true;
            data = data.slice(0, -2);
            var $form = $('<div></div>');
            var $text = $('<div></div>');
            var $input = $('<input></input>');
            var $button = $('<input type="button" value="入力"></input>')

            $text.html(data);
            $form.append($text);
            $form.append($input);
            $form.append($button);
            var form = this.handler.pushMessage($form, true);

            function input() {
                var text = $input.val()
                that.handler.deleteMessage(form)
                pro.stdin.write(text+'\n');
            }

            $input.on('keydown', (e) => {
                if (e.keyCode === 13)
                    input()
            })
            $button.on('click', () => {
                input()
            })
        } else {
            var $text = $('<div></div>');
            $text.html(data);
            this.handler.pushMessage($text);
        }
    })
    this.exeing = true;
}