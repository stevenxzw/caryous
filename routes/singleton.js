/**
 * Created by zhiwen on 14-3-19.
 * 单例功能
 */

(function(){

    exports.singleton = {

        anther :  function(req, res){
            res.json(200, {name:"张三",age:40});
        },

        importCarType : function(req, res){
            var cartype = require('./../data/cartype').cartype,
                conn = require('./../func/mongo-skin').skin;
            conn.add('cartype', cartype, function(err,result){

                if(err) throw err;
                if(result){
                    if(_debug) console.log('-------------------importCarType-----------success--------------');
                    res.render('importCarType');
                }
            })
        }
    }

})()
