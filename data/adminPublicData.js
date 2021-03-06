/**
 * Created by Administrator on 14-3-25.
 * 后台公共数据
 */

(function(){
    var cutil = require('./../func/cutil').util;
    exports.pd = {
        getPd : function(d){
            var cd = cutil.deepClone(commonData);
            return  cutil.extend(d||{},cutil.extend(cd,adminPublicData));
        },

        getCommonPd : function(){
            return commonData;
        }
    };

    var commonData = {
        project_name : 'CarYous',

        _debug : global._debug

    };

    var adminPublicData = {
        items : [{
            cls :'',
            item : 'Home',
            uri : '/admin'

        },{
            cls : '',
            item : 'Users',
            uri : '/admin/users'
        },{
            cls : '',
            item : 'CarType',
            uri : '/admin/cartype'

        },{
            cls : '',
            item : 'Cars',
            uri : '/admin/cars'

        },{
            cls : '',
            item : 'Park',
            uri : '/admin/park'
        }]

    };

})()
