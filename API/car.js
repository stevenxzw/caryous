/**
 * Created by zhiwen on 14-3-28.
 */
(function(){
    var _debug = global._debug ,
        carClass = require('./../func/initFun').carClass,
        impl = require('./../func/impl').Impl,
        cutil = require('./../func/cutil').util;
    exports.apiCar = {

        //取所有类型
        getCarTypes : function(req, res, fn){
            impl.getCarTypes(function(err, r){
                if(err){
                    _debug && console.log('read---cartypes---error');
                    throw err;
                }
                fn && fn(r);
                //res.render('cartype',{action:'cartype', cartypes:r, length : r.length});
            })
        },

        getCarType : function(req, res, key){
            impl.getCarType(key, function(err, r){
                if(err){
                    _debug && console.log('read---cartype---error');
                    throw err;
                }
                res.json(cutil.resultCollection(err, '', r))
                //fn && fn(r);
                //res.render('cartype',{action:'cartype', cartypes:r, length : r.length});
            })
        },

        getCarByKey : function(req, res){
            var car = cutil.getHttpRequestParams(req);
            if(car.key){
                impl.getUserPwd(user.username, function(err, result){
                    if(err){
                        res.json(cutil.resultCollection(err,'', result));
                    }else{
                        if(impl.comparePwdMD5(result, user.pwd)){
                            impl.setSessin(req, user);
                            res.json(cutil.resultCollection(err, '', result));
                        }else{
                            res.json(cutil.resultCollection("密码错误",'10001', result));
                        }
                    }
                });
            }
        },

        getCarTypeCount : function(req, res){
            impl.carTypeCount(function(err, result){
                if(err){
                    res.json(cutil.resultCollection(err,'', result));
                }else{
                    res.json(cutil.resultCollection(err, '', result));
                }
            });

        }

    }


})()
