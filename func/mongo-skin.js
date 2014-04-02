/**
 * Created by zhiwen on 14-3-18.
 * 数据库操作
 */
(function(){
    var db = require('./conn.js').db, _debug = global._debug;
    exports.skin = {
        connectType : 'local',

        add : function(table, opts, fn){
            if(_debug) console.log('--------insert------');
            db.collection(table||'test').insert(opts, function(err, result) {
                if(fn){
                    fn(err, result);
                    return;
                }
                if (err) throw err;

                if (result){
                    if(_debug) console.log('----add---success------');
                };
                //db.close();
            });
        },

        read : function(table, items, fn, page, pageSize){
            //if(_debug) console.log('--------read------');
            if(!page){
                db.collection(table||'test1').find(items).toArray(function(err, data){
                    //if(_debug) console.log(data);
                    //if(err) throw err;
                    fn && fn(err,data);
                    //if(_debug) console.log(data);
                });
            }else{
                pageSize = pageSize || 10;
                db.collection(table||'test1').find(items).limit(pageSize).skip((page-1)*pageSize).toArray(function(err, data){
                    //if(_debug) console.log(data);
                    //if(err) throw err;
                    fn && fn(err,data);
                    //if(_debug) console.log(data);
                });

            }
        },

        count : function(table, items, fn){
            db.collection(table||'test1').find(items).count(function(err, data){
                fn && fn(err,data);
            });
        },

        update : function(table, condition, items, fn){
            db.collection(table || 'test1').update(condition || {id:"xiaoming2"}, items || {$set:{'acount':{a:1}}}, function(err) {
                if (err) throw err;
                fn && fn();
            });

        },

        remove : function(table, condition, fn){
            db.collection(table || 'test1').remove(condition || {name:'xiaoming2'}, function(err, result) {
                if(fn) fn(err, result);
                else{
                    _debug && console.log('VR deleted!');
                }
            });
        }

    }

})();