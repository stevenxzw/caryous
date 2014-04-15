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
    myApp.service('reverseService',function(){
        this.reverse = function(text){
            return text.split(" ");
        }
    }).factory('alertService', function($rootScope) {
            var alertService = {};

            // 创建一个全局的 alert 数组
            $rootScope.alerts = [{ type: 'error', msg: 'Oh snap! Change a few things up and try submitting again.' },
                { type: 'success', msg: 'Well done! You successfully read this important alert message.' }];

            alertService.add = function(type, msg) {
                $rootScope.alerts.push({'type': type, 'msg': msg, 'close': function(){ alertService.closeAlert(this); }});
            };

            alertService.closeAlert = function(alert) {
                alertService.closeAlertIdx($rootScope.alerts.indexOf(alert));
            };

            alertService.closeAlertIdx = function(index) {
                $rootScope.alerts.splice(index, 1);
            };

            return alertService;
        }).directive('hello', function() {
            return {
                restrict: 'E',
                template: '<div>Hi there</div>',
                replace: true
            };
        }).directive('mySvg', function($rootScope){

            return {
                controller : function($attrs,$element){
                    debugger;
                    $element.html('=============');

                },
                link:function(scope,element,attrs) {
                    element.html('----------------');
                    opened = false;
                    element.bind("click", toogle);
                    element.addClass("closed");
                    function toogle() {
                        opened = !opened;
                        element.removeClass(opened ? "closed" : "opened");
                        element.addClass(opened ? "opened" : "closed");
                    }
                },
                    restrict: 'A',
                template: '<div>Hi there</div>',
                replace: true
            };
        });


    console.log('pageReady');
    //angular.element(document).ready(function() {
        var action = config.action;
        switch(action){
            case 'admin/login' :
                myApp.controller('loginControl', ['$scope', '$http', 'reverseService', 'alertService', function($scope, $http, reverseService, alertService){
                    alertService.add('success', 'adfaf');
                    $scope.master= {};
                    $scope.$watch('user.username', function(v){
                       console.log(v);

                    })
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
                }])
                break;
            case 'admin/cars' :
                win.carsControl = function($scope,$http,$compile){
                    $scope.itemClick = function(e, item) {}

                }
                break;
            case 'admin/carType' :
                win.cartypeControl = function($scope,$http,$compile){
                    $scope.cartypes = cartypes;
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
