/**
 * Created by zhiwen on 14-3-27.
 */

(function($, win){

    if(typeof Caryous === 'undefined'){
        Caryous = {};
    }

    var Util = {

        deepClone : function(o){
            var type = this.getType(o), newo;
            if(type === 'array'){
                newo = [];
                for(var i=0,len = o.length;i<len;i++){
                    newo.push(this.deepClone(o[i]));
                }
            }else if(type === 'object'){
                newo = {};
                for(var p in o){
                    newo[p]=this.deepClone(o[p]);
                }
            }else return o;
            return newo;
        },

        //简单继承
        extend : function(destination, source) {
            for (var property in source)
                destination[property] = source[property];
            return destination;
        },
        //读取变量类型
        getType : function(o) {
            return ((_t = typeof(o)) == "object" ? o==null && "null" || Object.prototype.toString.call(o).slice(8,-1):_t).toLowerCase();
        },

        //ajax请求结果结构化
        resultCollection : function(err,code, result){
            if(err){
                return {err:code || 10000, msg : err, raw : {}};
            }
            return {err:0, msg:'', raw : result};
        },

        //取http请求参数
        getHttpRequestParams : function(req){
            var body = req.body, query  = req.query, params = {};
            function foreach(res){
                for(var k in res){
                    if(k !== '__proto__'){
                        params[k] = res[k];
                    }
                }
            }
            foreach(body);
            foreach(query);
            return params;
        },

        getRel : function(elem){

        },

        parseKnV : function(strRel){
            var map = {}, kv, kvs = this.split(strRel||'', ',');
            try {
                for( var i=0,len=kvs.length;i<len;i++){
                    // if not contains ':'
                    // set k = true
                    if(kvs[i].indexOf(':') === -1){
                        map[kvs[i]] = true;
                    }else {
                        // split : to k and v
                        kv = Util.split(kvs[i], ':');
                        // escape value
                        map[kv[0]] = kv[1];
                    }
                }
            }catch(e) {
                if(__debug) console.trace();
                throw 'Syntax Error:rel字符串格式出错。' + strRel;
            }

            return map;
        },

        split : function(str, splitChar, escChar){
            var c, arr = [], tmp = [];
            if(!escChar)
                escChar = '\\';

            for(var i=0,len=str.length;i<len;i++){
                c = str.charAt(i);
                if(c === splitChar){
                    arr.push(tmp.join(''));
                    tmp.length = 0;
                    continue;
                }
                else if(c === escChar && str.charAt(i+1) === splitChar){
                    c = splitChar;
                    i++;
                }
                tmp[tmp.length] = c;
            }
            if(tmp.length)
                arr.push(tmp.join(''));
            return arr;
        },

        domUp : function(el, selector, end){
            end = end || doc.body;
            var isStr = typeof selector === 'string';
            while(el){
                if(isStr){
                    if($(el).is(selector))
                        return el;
                }else if(selector(el)){
                    return el;
                }
                el = el.parentNode;
                if(el === end)
                    return null;
            }
            return el;
        },

        collectRels : function(trigSource, stopEl, cache) {
            var rels, rel, self = this;

            if (cache === undefined)
                cache = true;
            // 往上收集rel
            this.domUp(trigSource, function(el) {
                var jq = $(el);

                if (cache) {
                    rel = jq.data('gf_rel');
                    if (!rel) {
                        rel = jq.attr('rel');
                        if (rel) {
                            rel = {
                                src : el,
                                data : self.parseRel(rel)
                            };
                            //jq.data('gf_rel', JSON.stringify(rel));
                        }
                    }
                } else {
                    rel = jq.attr('rel');
                    if (rel)
                        rel = {
                            src : el,
                            data : self.parseRel(rel)
                        };
                }

                if (rel) {
                    if (!rels)
                        rels = [];
                    rels[rels.length] = rel;
                }

            }, stopEl);

            return rels;
        },
        parseRel : function(rel) {
            if ( typeof rel === 'string')
                return Util.parseKnV(rel);
            return this.parseKnV($(rel).attr('rel'));
        }

    };

    var Event = function(opt){
        $.extend(this, opt);
        this.q = Util.collectRels(this.target, this.end || 'body');
    }
    Event.prototype = {
        get : function(name) {
            var r = this.getRel(name);
            return r && r.data && r.data[name];
        },
        getEl : function(name) {
            var r = this.getRel(name);
            return r && r.src;
        },

        getRel : function(name){
            var set = this.q, end = set.length;
            for (var i = 0; i <= end; i++) {
                var d = set[i].data;
                if (d[name] !== undefined)
                    return set[i];
            }
        }

    };

    Caryous = {
        Util : Util,

        Event : Event

    };

    win['Caryous'] = Caryous;
})(jQuery, window);