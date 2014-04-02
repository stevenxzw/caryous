/**
 * Created by zhiwen on 14-3-17.
 * 连接数据库
 */

(function(){
    var _debug = global._debug;
    if(_debug) console.log('========================conn-----------------------');
    var mongo = require('mongoskin');
    if(global._local)
        exports.db = mongo.db('mongodb://localhost/caryous');
    else
        exports.db = mongo.db('mongodb://admin:123456@ds033709.mongolab.com:33709/stevenxie');
})();
