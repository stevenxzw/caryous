/**
 * Created by zhiwen on 14-3-19.
 */
(function(){
    var _debug = global._debug,
        mongo = require('./mongo-skin.js').skin,
        cutil = require('./cutil').util;


    exports.initClass = {
        //导入汽车类型
        importCarTypes : function(req, res){
            mongo.add('cartype', require('./../data/cartype.js').cartype, function(err, result){
                if(err){
                    _debug && console.log('add---cartype---error');
                    throw err;
                }
                _debug && console.log('add---cartype---success');
                res && res.send('add---cartype---success!');
            });

        },
        exportCarType : function(req, res){},
        importCars : function(req, res){
            var carTypes = cutil.deepClone(require('./../data/cartype.js').cartype);
            var http = require('http');
            function get(){
                var g0  = []
                if(carTypes.length){
                    g0 = carTypes.splice(0,1);
                    var _key;
                    if(g0.length === 1) _key = g0[0]['key'];
                    else return;
                    console.log(g0);
                    var http = require('http');
                    var _request = http.get({
                        host: '127.0.0.1',
                        port : 8087,
                        path: 'http://api.car.bitauto.com/CarInfo/MasterBrandToSerialNew.aspx?type=2&pid='+_key+'&rt=serial&serias=m&key=serial_2_2_m&include=1'},
                        function(res) {
                            res.setEncoding('UTF-8');
                            res.on('data', function (data) {
                                var d = data.split(']=');
                                if(d.length === 2){
                                    var cars = JSON.parse(d[1]), insertCars = [];
                                    for(var k in cars){
                                        var car = cars[k];
                                        insertCars.push(car);
                                    }
                                    mongo.add('cars', insertCars, function(err, r){
                                        if(!err){
                                            console.log('add--------------car-------------------'+g0[0]['cname']);
                                        }else{
                                             console.log('add--------------car-------------------error');
                                        }
                                        get();
                                    });
                                }else{
                                    get();
                                }
                            });
                        });
                    _request.end();
                }else{
                    res.send('<div>export cars success</div>');
                }
            }
            get();
        },

        //请求易车网
        importCarTypeByBitauto :function(){

        },

        //用户创建
        initUsers : function(req, res){
            mongo.add('user', require('./../data/users.js').users, function(err, result){
                if(err){
                    _debug && console.log('add---users---error');
                    throw err;
                }
                _debug && console.log('add---users---success');
                res && res.send('add---users---success!');
            });
        },

        delCarType : function(req, res){
            var carTypes = cutil.deepClone(require('./../data/cartype.js').cartype);
            function del(){
                var g0  = [];
                if(carTypes.length){
                    g0 = carTypes.splice(0,1);
                    var _key;
                    if(g0.length === 1) _key = g0[0]['key'];
                    mongo.read('cars', {'pid' : _key}, function(err, result){
                        if(result.length === 0){
                            mongo.remove('cartype', {'key' : _key}, function(err, result){
                                if(err) _debug && console.log(err);
                                _debug && console.log('del-------------'+g0[0].cname);
                                del();
                            })
                        }else{
                            del();
                        }
                    })
                }else{
                    res.send('<div>del cartype success</div>');
                }


            }

            del();

        }




    };

})()
