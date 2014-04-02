/**
 * Created by zhiwen on 14-3-24.
 */

(function(){
    var _debug = global._debug ,
        carClass = require('./../func/initFun').carClass,
        impl = require('./../func/impl').Impl,
        cutil = require('./../func/cutil').util;
    exports.apiUser = {

        login : function(req, res){
            var user = cutil.getHttpRequestParams(req);
            if(user.username){
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



        }

    }


})()
