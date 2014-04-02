/**
 * Created by zhiwen on 14-3-19.
 * 路由控制器(建立在express基本上)
 */
(function(){

    var _debug = global._debug ,
        initClass = require('./../func/initFun').initClass,
        impl = require('./../func/impl').Impl,
        filter = require('./../func/filter').authorize,
        cutil = require('./../func/cutil').util,
        apiUser = require('./../API/user').apiUser,
        apiCar = require('./../API/car').apiCar,
        adminPage = require('./../func/adminPage').adminPage;




    var routes = {
        '/test' :[false, function(req, res){
           res.send('<div>test</div>');
        }],
        /*----------------------初始化数据-------------------------*/
        '/init/cars' : [false, initClass.importCars],  //导入车数据
        '/init/delCarType' : [false, initClass.delCarType],
        /*----------------------初始化数据结束-------------------------*/

        /*--------------------------API---------------------------*/

        '/api/getCarType' : [true,function(req, res){
             var params = cutil.getHttpRequestParams(req);
             apiCar.getCarType(req, res, params['key']);
        }],
        '/api/getCarTypes' : [true,apiCar.getCarTypes],

        '/api/login'   : apiUser.login,
        '/api/cartypeCount' : apiCar.getCarTypeCount,
        /*-------------------------------------登录后台路由-----------------------------------------*/
        //登录页面
        '/admin/login' : [true, adminPage.login],


        /*-------------------------------------登录后台路由结束-------------------------------------*/

        '/admin' : [true, function(req, res){
            _debug && console.log(req.session.user_id);
            var data = adminPage.index(req, res);
            var blogEngine = require('./../data/blog');
            res.render('admin/index',cutil.extend({
                layout: 'adminLayout',
                action : 'admin/index', title:"管理后台", entries:blogEngine.getBlogEntries(), doc:"---"},data));
        }],

        '/detail' : [true, function(req, res){
            var conn = require('./../func/mongo-skin').skin;
            conn.read('cartype','', function(err,data){
                if(_debug) console.log(data);
            });
            //console.log('**********************');
            //console.log(res.locals.email);
            res.render('detail',{title:"详细内容"});
        }],

        '/anther' : require('./singleton').singleton.anther,

        '/importCarType' : [true, initClass.importCarTypes],

        '/admin/cartype' : [true,function(req, res){
            if(_debug) console.log('---------------------------');
            var params = cutil.getHttpRequestParams(req),
                page = params['p'] || 1,
                pageSize = params['ps']||20;
            impl.getCarTypes(page, pageSize, function(err, r){
                 if(err){
                    _debug && console.log('read---cartype---error');
                    throw err;
                 }
                var data = adminPage.carType(req, res);
                res.render('admin/carType',cutil.extend({
                    layout: 'adminLayout',
                    action : 'admin/carType', title:"管理后台",cartypes:r, length : r.length},data));
            })
         }],

        '/admin/cars' : [true,function(req, res){
            var page = cutil.getHttpRequestParams(req)['p'] || 1;
            impl.getCars(page, function(err, r){
                if(err){
                    _debug && console.log('read---cars---error');
                    throw err;
                }
                var data = adminPage.cars(req, res);
                res.render('admin/cars',cutil.extend({
                    layout: 'adminLayout',
                    action : 'admin/cars', title:"管理后台",cars:r, length : r.length},data));
            })
        }]

    }

    var fn = {

        getUri : function(eapp){
            return eapp.route;
        },

        globalRoute : function(eapp){
            /*
            //统一过滤器
            eapp.get('/admin/?:action', filter, function(req, res, next){
                next();
            });
            */
            var isFilter = true;
            for(var rot in routes){
                var item =  routes[rot], type = cutil.getType(item);
                if(isFilter && type === 'array' && item.length && item[0] === true){
                    eapp.get(rot, filter, item[1]);
                    eapp.post(rot, filter, item[1]);
                }else{
                    eapp.get(rot, type === 'array' ? item[1] : item);
                    eapp.post(rot, type === 'array' ? item[1] : item);
                }
            }
        }

    }

    exports.routefn = fn;
    //initClass.exportCarType();
    //初始化数据
    //initClass.initUsers();
    //initClass.importCarTypes();
    /*
    var http = require('http'),
        op = {
            host: '127.0.0.1',
            port: 8087,
            method: 'GET',
            path: 'http://api.car.bitauto.com/CarInfo/MasterBrandToSerialNew.aspx?type=2&pid=2&rt=serial&serias=m&key=serial_2_2_m&include=1'
        }
    var req = http.request(op, function (res) {
        res.on('data', function (chunk) {
            console.log('BODY:' + chunk);
        });
    });
    req.on('error', function (e) {
        console.log('Error got: ' + e.message);
    });
    req.end();
    */


})()
