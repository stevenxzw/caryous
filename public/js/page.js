/**
 * Created by zhiwen on 14-3-24.
 */

(function(CY, $$, win){

    var util = CY['Util'],
        Event = CY['Event'],
        Tpl = CY['Tpl'];
    var _debug = config._debug;

    var myApp = angular.module('myApp',['DelegateEvents'], function($interpolateProvider) {
        $interpolateProvider.startSymbol('<%');
        $interpolateProvider.endSymbol('%>');
    });

    console.log('pageReady');
    //angular.element(document).ready(function() {
        var action = config.action;
        switch(action){

            case 'admin/login' :
                win.loginControl = function($scope,$http){
                    $scope.master= {};
                    $scope.login = function(user){
                        var md = $scope.master = angular.copy(user);
                        if(md && md.username && md.pwd){
                            $http.post('/api/login',user).success(function(data, status, headers, config){
                               if(data.err === 0){
                                   location.href = '/admin';
                                   console.log('success');
                                   $scope.msg = 'success';
                               }else{
                                   $scope.msg = data.msg;
                               }
                            }).error(function(data, status, headers, config){
                                    $scope.msg = '网络错误';
                            });
                        }
                    }
                }
                break;
            case 'admin/cars' :
                win.carsControl = function($scope,$http,$compile){
                    $scope.itemClick = function(e, item) {}

                }
                break;
            case 'admin/carType' :
                win.cartypeControl = function($scope,$http,$compile){

                    $http.get('/api/cartypeCount').success(function(r){
                        $scope.test = r.raw;
                    });

                    $scope.cl = function($e){
                        debugger;
                    }

                    var insertDiv = null, loading = false;

                    $scope.itemClick = function(e, item) {
                        e.preventDefault();
                        var rel = new Event({target:e.target, end:e.currentTarget});
                        if(!rel.q) return;
                        if($(e.delegationTarget).hasClass('car-change')){//查看类型
                            _debug && console.log(rel.get('key'));
                            $.get('/api/getCarType', {key :rel.get('key')}, function(r){
                                console.log(r);
                            });
                            if(!rel.q) return;
                            var modal = $('body').data('modal');
                            if(!modal){
                                modal = $(Tpl.parse(Tpl.get('modal'),{title:rel.get('cname')})).appendTo('body');
                                modal.on('hidden.bs.modal', function (e) {
                                    console.log('----');
                                })
                            }


                            modal.modal('toggle');
                            $('body').data('modal', modal);
                            _debug && console.log(modal)
                        }else{
                            if(!insertDiv || (insertDiv && insertDiv.attr('id') !== 'i-'+rel.get('key'))){
                                insertDiv && insertDiv.remove();
                                var tmp = Tpl.get('carsByType');
                                insertDiv = $(Tpl.parse(tmp, {key : rel.get('key'), carslist : '<div>-------------</div>'})).insertAfter(e.delegationTarget.parentNode);
                            }
                        }
                    };
                }
                break;
        }
   // });

})(Caryous, jQuery, window);
