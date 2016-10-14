var app = angular.module('myApp', ['ui.router']);
app.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
  //路由重定向 $urlRouterProvider
  // 没有路由引擎能匹配当前的导航状态，那它就会默认将路径路由至/admin
  $urlRouterProvider.when('', '/admin');
  $urlRouterProvider.when('/', '/admin');
  $urlRouterProvider.otherwise('/404');
  $stateProvider
    .state('error', {
      url: '/404',
      template: '<div class="text-center"><h1>页面不存在404！</h1>' +
      '<div class="text-center"><a ui-sref="common.pageOne">跳转到首页</a></div></div>'
    })
    .state('admin', {
      url: '/admin',
      templateUrl: './module/admin/page.html',
      controller: 'AdminController',
    })
    .state('user', {
      url: '/user',
      templateUrl: './module/user/page.html',
      controller: 'UserController',
    })
}])

/**
 * Created by Administrator on 2016/8/31.
 */
app.service('clone',function(){
  this.cloneObj = function(obj){
    var o;
  }
  this.obj=function(obj){
    var o;
    if (obj.constructor == Object){
      o = new obj.constructor();
    }else{
      o = new obj.constructor(obj.valueOf());
    }
    for(var key in obj){
      if ( o[key] != obj[key] ){
        if ( typeof(obj[key]) == 'object' ){
          o[key] = this.obj(obj[key]);
        }else{
          o[key] = obj[key];
        }
      }
    }
    //o.toString = obj.toString;
    //o.valueOf = obj.valueOf;
    return o;
  }
});

/**
 * Created by Administrator on 2016/8/30.
 */
app.controller("AdminController", ["$scope", function($scope){
  $scope.title = "管理员模块";
  //$scope.date = moment().format("YY-MM")
}])

/**
 * Created by Administrator on 2016/8/30.
 */
app.controller("UserController", ["$scope", function($scope){
  $scope.title = "用户模块"
}])
