const client = require('cheerio-httpcli');
const $$ = require('./CrankyCollection')

module.exports = function WizTools(handler, config) {
    this.config = config
    this.handler = handler
    $ = handler.$
    c$ = $
}

module.exports.prototype.search = function() {
    var that = this
    var $text = $(`<div>${this.config.search.message}</div>`);
    var $input = $('<input>');
    var $button = $('<input type="button" value="検索"></input>');

    function Search(args) {
        var query = { and: [], or: [] };
        var nameselect = "";
        try {
            if (args.length == 1) {
                nameselect = args.shift()
            }
            (function(args) {
                if (args.length == 0) {
                    return
                }
                var now = args.shift();
                if (!now.split('').some((s) => {
                        return "火雷水闇光単".indexOf(s) == -1
                    })) {
                    args.unshift(now);
                    now = "属性"
                }
                switch (now) {
                    case "属性":
                    case "z":
                        var typetmp = args.shift().split('')
                        var maintype;
                        switch (typetmp[0]) {
                            case '火':
                                maintype = 1;
                                break
                            case '水':
                                maintype = 2;
                                break;
                            case '雷':
                                maintype = 3;
                                break
                        }
                        switch (typetmp[1]) {
                            case '火':
                                maintype *= 10;
                                if (maintype >= 20)
                                    maintype++;
                                maintype += 0;
                                break
                            case '水':
                                if (maintype == 2) {
                                    maintype = 20;
                                } else {
                                    maintype = maintype * 10 + 2;
                                }
                                break
                            case '雷':
                                if (maintype == 3) {
                                    maintype = 30;
                                } else {
                                    maintype = maintype * 10 + 2;
                                }
                                break
                            case '光':
                                maintype *= 10;
                                maintype += 4;
                                break
                            case '闇':
                                maintype *= 10;
                                maintype += 5;
                                break
                        }
                        query.and.push("zo" + maintype);
                        break;
                    case "ss":
                    case "SS":
                        var sss = [{ "name": "スキル反射無視", "class": "ss-z01" }, { "name": "味方HP消費", "class": "ss-z02" }, { "name": "瀕死時強化", "class": "ss-z03" }, { "name": "状態異常時強化", "class": "ss-z04" }, { "name": "溜め(チャージ)", "class": "ss-z05" }, { "name": "大魔術", "class": "ss-a01" }, { "name": "遅延大魔術", "class": "ss-a02" }, { "name": "特効大魔術", "class": "ss-a03" }, { "name": "犠牲魔術", "class": "ss-a04" }, { "name": "自己犠牲魔術", "class": "ss-a05" }, { "name": "反動大魔術", "class": "ss-a06" }, { "name": "反動大魔術・蝕", "class": "ss-a07" }, { "name": "弱体化大魔術", "class": "ss-a08" }, { "name": "斬撃大魔術", "class": "ss-a09" }, { "name": "多弾魔術", "class": "ss-a10" }, { "name": "時限大魔術", "class": "ss-a11" }, { "name": "効果解除大魔術", "class": "ss-a12" }, { "name": "割合削り", "class": "ss-a13" }, { "name": "無に還す瞳", "class": "ss-a14" }, { "name": "激化大魔術", "class": "ss-a15" }, { "name": "詠唱大魔術", "class": "ss-a16" }, { "name": "大魔術", "class": "ss-b01" }, { "name": "遅延大魔術", "class": "ss-b02" }, { "name": "特効大魔術", "class": "ss-b03" }, { "name": "犠牲魔術", "class": "ss-b04" }, { "name": "自己犠牲魔術", "class": "ss-b05" }, { "name": "反動大魔術", "class": "ss-b06" }, { "name": "反動大魔術・蝕", "class": "ss-b07" }, { "name": "弱体化大魔術", "class": "ss-b08" }, { "name": "残滅大魔術", "class": "ss-b09" }, { "name": "効果解除大魔術", "class": "ss-b10" }, { "name": "毒", "class": "ss-b11" }, { "name": "割合削り", "class": "ss-b12" }, { "name": "多弾魔術", "class": "ss-b13" }, { "name": "純属性大魔術", "class": "ss-b14" }, { "name": "ガード", "class": "ss-c01" }, { "name": "ダメージブロック", "class": "ss-c02" }, { "name": "状態異常無効", "class": "ss-c03" }, { "name": "鉄壁・極", "class": "ss-c04" }, { "name": "パネル変換", "class": "ss-d01" }, { "name": "シャッフル", "class": "ss-d02" }, { "name": "特殊パネル変換", "class": "ss-d03" }, { "name": "遅延", "class": "ss-e01" }, { "name": "スキルチャージ", "class": "ss-e02" }, { "name": "スキルチャージ&遅延", "class": "ss-e03" }, { "name": "解答削り", "class": "ss-e04" }, { "name": "効果解除", "class": "ss-e05" }, { "name": "ブースト", "class": "ss-e06" }, { "name": "ダメージ強化", "class": "ss-e07" }, { "name": "複属性ダメージ強化", "class": "ss-e08" }, { "name": "ステータスアップ", "class": "ss-e09" }, { "name": "精霊強化", "class": "ss-e10" }, { "name": "カウンター", "class": "ss-e11" }, { "name": "チェインガード", "class": "ss-e12" }, { "name": "AS発動時間延長", "class": "ss-e13" }, { "name": "挑発", "class": "ss-e14" }, { "name": "狂暴化", "class": "ss-e15" }, { "name": "純属性強化", "class": "ss-e16" }, { "name": "回復", "class": "ss-f01" }, { "name": "継続回復", "class": "ss-f02" }, { "name": "状態異常回復", "class": "ss-f03" }, { "name": "状態異常回復&蘇生", "class": "ss-f04" }, { "name": "蘇生", "class": "ss-f05" }, { "name": "自己犠牲蘇生", "class": "ss-f06" }, { "name": "起死回生", "class": "ss-f07" }, { "name": "スキルコピー", "class": "ss-z00" }]
                        var skillname = args.shift().split(',')
                        skillname.forEach(function(name) {
                            var q = sss.find(function(data) {
                                return data.name.indexOf(name) != -1;
                            })
                            if (!q) {
                                throw 0;
                            }
                            query.and.push(q.class)
                        })
                        break;
                    case "as":
                    case "AS":
                        var ass = [{ "name": "攻撃", "class": "as01" }, { "name": "チェイン攻撃", "class": "as02" }, { "name": "種族数攻撃", "class": "as03" }, { "name": "快調攻撃", "class": "as04" }, { "name": "瀕死攻撃", "class": "as05" }, { "name": "属性の加護", "class": "as06" }, { "name": "パネル色数攻撃", "class": "as07" }, { "name": "嘆きの怒り", "class": "as08" }, { "name": "吸収", "class": "as09" }, { "name": "ギャンブル攻撃", "class": "as10" }, { "name": "分散攻撃", "class": "as11" }, { "name": "全体攻撃", "class": "as12" }, { "name": "攻撃強化", "class": "as13" }, { "name": "種族攻撃強化", "class": "as14" }, { "name": "複属性攻撃強化", "class": "as15" }, { "name": "属性特効", "class": "as16" }, { "name": "種族特効", "class": "as17" }, { "name": "属性特効連撃", "class": "as18" }, { "name": "連撃", "class": "as19" }, { "name": "回復", "class": "as20" }, { "name": "ガード", "class": "as21" }, { "name": "スキルコピー", "class": "as22" }]
                        var skillname = args.shift().split(',')
                        skillname.forEach(function(name) {
                            var qs = ass.filter(function(data) {
                                return data.name.indexOf(name) != -1;
                            })
                            if (qs.length == 0) {
                                throw 0;
                            }
                            qs.forEach(function(q) {
                                query.or.push(q.class)
                            })
                        })
                        break;
                    case "name":
                    case "名前":
                        nameselect = args.shift()
                        break;
                    default:
                        nameselect = now;
                        break;
                }
                arguments.callee(args)
            })(args)
        } catch (e) {
            return "検索方法が間違ってるぞば"
        }
        var andparse = query.and.map(function(data) {
            return "." + data
        }).join('')
        var orparse = query.or.map(function(data) {
            return "." + data
        }).join(',')
        client.fetch("https://xn--u9jvfi5fv563byzsc.gamewith.jp/article/show/33254", {}, function(err, $, res) {
            var tmp = $('[data-col1]');
            if (andparse != "") {
                tmp = tmp.filter(andparse);
            }
            if (orparse != "") {
                tmp = tmp.filter(orparse);
            }
            var sendcount = 0;
            // console.log(nameselect)
            tmp.each(function(i, t) {
                if (sendcount >= 15) {
                    return -1;
                }
                var retstr = "";
                var tmp = $(t)
                var link = tmp.find('a[href]').attr('href');
                var img = tmp.find('img').attr('src');
                var name = tmp.find('a[href]').text();
                if (nameselect != "" && name.indexOf(nameselect) == -1) {
                    return;
                }

                client.fetch(link, {}, function(err, $, res) {
                    var answerSkilTable = $('p:contains("※AS=アンサースキル SS=スペシャルスキル")').eq(0).next('table')
                    var specialSkilTable = answerSkilTable.next('table');
                    var answerSkils = answerSkilTable.find('tr>td');
                    var specialSkils = specialSkilTable.find('tr>td');

                    var skilsText = "・ 通常時<br>" +
                        "  AS1 : " + answerSkils.eq(1).text() + "<br>" +
                        "  SS1 : " + specialSkils.eq(1).text() + "<br>" +
                        "・ Lモード時<br>" +
                        "  AS2 : " + answerSkils.eq(0).text() + "<br>"+
                        "  SS2 : " + specialSkils.eq(0).text() + "<br>"
                    var statusTable = answerSkilTable.prevAll('table').eq(0)
                    var status = {
                        syuzoku: statusTable.find('tr').eq(1).find('td').eq(0).text(),
                        kosuto: statusTable.find('tr').eq(1).find('td').eq(1).text(),
                        HP: statusTable.find('tr').eq(1).find('td').eq(2).text(),
                        ATK: statusTable.find('tr').eq(1).find('td').eq(3).text()
                    }
                    var statusText = " 種族 : " + status.syuzoku + "  コスト : " + status.kosuto + "<br>" +
                        " HP : " + status.HP + "  攻撃力 : " + status.ATK

                    var name = $$(["【魔法使いと黒猫のウィズ】", true, "の評価", -3, false], $('title').text())


                    var retstr = `${statusText}<br>${skilsText}`;
                    var $div = c$('<div></div>');
                    $div.html(retstr);

                    $div.css(that.config.search.css)
                    var div = that.handler.pushMessage($div,true);

                    $div.on('click',()=>{
                        that.handler.deleteMessage(div)
                    })
                })
            })
        })
    }

    var $form = $('<div>');
    $form.append($text);
    $form.append($input);
    $form.append($button);

    var form = this.handler.pushMessage($form,true);

    function input() {
        var text = $input.val()
        that.handler.deleteMessage(form)
        Search(text.split(' '))
    }

    $input.on('keydown', (e) => {
        if (e.keyCode === 13)
            input()
    })
    $button.on('click', () => {
        input()
    })
}

module.exports.prototype.question = function() {

}

module.exports.prototype.menu = function() {
    var that = this;
    return {
        label: "WizTools",
        submenu: [{
            label: "精霊検索",
            click:() => {
                that.search();
            }
        }, {
            label: "ランダム問題",
            click: () => {
                that.question();
            }
        }]
    }
}