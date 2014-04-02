/**
 * Created by zhiwen on 14-3-20.
 * 登录过滤
 */
(function(){

    exports.authorize = function(req, res, next) {
        if (!req.session.user_id && req.url.indexOf('admin/login') ==-1) {
            res.redirect('/admin/login');
        } else {
            next();
        }
    }

})()
