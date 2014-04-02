/**
 * Created by Administrator on 14-3-23.
 * 功能实现类
 */

(function(){
    var mongo = require('./mongo-skin.js').skin,
        _debug = global._debug;
    exports.Impl = {
        //取车类型方法
        getCarTypes : function(page, pageSize, fn){
            mongo.read('cartype','', function(err, result){
                /*
                if(err){
                    _debug && console.log('read---cartype---error');
                    throw err;
                }*/
                fn && fn(err, result);
            }, page, pageSize)
        },

        carTypeCount : function(fn){
            mongo.count('cartype', '', function(err, result){
                fn && fn(err, result);
            });

        },

        getCarType : function(key , fn){
            mongo.read('cartype',{'key' : key}, function(err, result){
                /*
                 if(err){
                 _debug && console.log('read---cartype---error');
                 throw err;
                 }*/
                fn && fn(err, result);
            })
        },

        getCars : function(p, fn){
            mongo.read('cars','', function(err, result){
                fn && fn(err, result);
            }, p)
        },

        getCarsById : function(id, fn){
            mongo.read('cars',{'id' : id}, function(err, result){
                fn && fn(err, result);
            })
        },

        /*-----------------帐号功能------------------*/

        //密码比较
        comparePwdMD5 : function(dbpwd, pwd){
            var crypto = require('crypto');
            var md5 = crypto.createHash('md5');
            return md5.update(pwd).digest('base64') === dbpwd;
        },

        //取出帐号密码
        getUserPwd : function(uid, fn){
            mongo.read('user', {"uid":uid}, function(err, result){
                if(result.length){
                    fn && fn(err, result[0].pwd);
                }else
                    fn && fn("帐号不存在", result);
            })
        },

        //获取帐号权限
        getRole : function(uid, fn){
            mongo.read('user', {"uid":uid}, function(err, result){
                if(result.length){
                    fn && fn(err, result[0].role);
                }else
                    fn && fn("帐号不存在", result);
            })
        },
        /*-----------------帐号功能结束------------------*/

        /*------------------session cookie*--------------------------*/
        setSessin : function(req, user){
            req.session.user_id = user.username || user.weiboId || user.qqId;
            //req.session.user = user;
        },

        getSession : function(req, key){
            _debug && console.log(req.session.user_id)
            if(req.session.user_id && key) return req.session[key];
             return req.session.user_id || '';
        },

        getCookie : function(__req){
            // 获得客户端的Cookie
            /*
            var Cookies = {};
            req.headers.cookie && req.headers.cookie.split(';').forEach(function( Cookie ) {
                var parts = Cookie.split('=');
                Cookies[ parts[ 0 ].trim() ] = ( parts[ 1 ] || '' ).trim();
            });
            */
            _debug && console.log(__req.cookies);
            return __req.cookies;
        },

        setCookie : function(__res, cookies, seconds, domain, httpOnly){
            seconds = seconds ? seconds*1000 : 0;
            for(var key in cookies){
                __res.cookie(key, cookies[key], {maxAge:seconds, path:domain || '/', secure:false, httpOnly:httpOnly?httpOnly:false});
            }
        },


        /*------------------session cookie*--------------------------*/

        /*------------------ car --------------------------*/
        getCarByKey : function(key, fn){
            mongo.read('car', {"pkey":key}, function(err, result){
                if(result.length){
                    fn && fn(err, result[0].role);
                }else
                    fn && fn("帐号不存在", result);
            })

        }
        /*------------------ car 结束--------------------------*/
    };

})()
