/**
 * Created by zhiwen on 14-3-21.
 * 管理后台功能
 */
(function(){
    var revalidator = require('revalidator'),
        impl = require('./impl').Impl,
        cutil = require('./cutil').util,
        publicData = require('./../data/adminPublicData').pd,
        initClass = require('./initFun').initClass;

    exports.adminPage = {
        //登录页面
        login : function(req, res, next){
            //impl.setCookie(res,{'userid':3232},60000);
            //res.cookie('name', 'adminss', {maxAge:60000000, path:'/', secure:true});
            //impl.getCookie(req);

            var user = impl.getSession(req);
            if(user){
                res.redirect('/admin');
            }else{
                res.render('admin/login', cutil.extend({action : 'admin/login',test:{a:1,b:2}}, publicData.getCommonPd()));
                //console.log( req.cookies);
            }

        },
        //后台首页
        index : function(req, res, next){
            return this.publicDate(0);
        },

        carType : function(req, res){
            return this.publicDate(2);
        },

        cars : function(req, res){
            return this.publicDate(3);
        },

        publicDate : function(_item){
            var pd = cutil.deepClone(publicData.getPd());
            pd.items[_item].uri = '#';
            pd.items[_item].cls = 'active';
            return pd;

        }



    }

})()