/**
 * Created by zhiwen on 14-3-21.
 * 验证单元
 */

(function(){

    var units = {

        url: {
            description: 'the url the object should be stored at',
            type: 'string',
            pattern: '^/[^#%&*{}\\:<>?\/+]+$',
            required: false
        },
        challenge: {
            description: 'a means of protecting data (insufficient for production, used as example)',
            type: 'string',
            format : ['email','ipv6'],
            minLength: 5
        },
        body: {
            description: 'what to store at the url',
            type: 'any',
            default: null
        },
        email : {
            format : 'email'
        },
        pwd : {


        }

    };


    exports.getUnits = function(items){
        function set(name){
            var v = units[name];
            if(v){
                _units[name] = v;
            }
        }
        var cutil = require('./cutil').util, _units = {};

        if(items){
            var type = cutil.getType(items);
            if(type === 'string'){
                var _items = items.split(',');
                if(_items.length > 1){
                    _units = arguments.callee(_items)
                }else set(items)
            }

            if(type === 'array'){
                for(var i= 0,l=items.length;i<l;i++)
                    set(items[i]);
            }
        }else{
            _units = units;
        }
        return _units;

    }

})()
