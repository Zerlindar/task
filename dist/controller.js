var app = angular.module('myApp', ['ui.router', 'ngAlertify']);
app.constant('apiUrl','http://test.xpcc.com.cn:8002/');
app.constant('socketUrl','http://test.xpcc.com.cn:4500/')
app.run(["alertify", function(alertify){
  alertify.maxLogItems(1).delay(3000).okBtn('确认').cancelBtn('取消');
}]);
app.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
  //路由重定向 $urlRouterProvider
  // 没有路由引擎能匹配当前的导航状态，那它就会默认将路径路由至/admin
  $urlRouterProvider.when('', '/login');
  $urlRouterProvider.when('/', '/login');
  $urlRouterProvider.when('/feed', '/feed/shotCut');
  $urlRouterProvider.when('/feed/', '/feed/shotCut');
  $urlRouterProvider.otherwise('/404');

  //$http.defaults.headers.common['token']=myCookie.getCookie('auth_token');
  //$httpProvider.defaults.headers.post['token'] = '123';   adminController
  $stateProvider
    .state('error', {
      url: '/404',
      template: '<div class="text-center"><h1>页面不存在404！</h1>'
    })
    .state('login', {
      url: '/login',
      templateUrl: './module/login/login.html',
      controller: 'loginController',
    })
    .state('admin', {
      url: '/admin',
      templateUrl: './module/admin/admin.html',
      controller: 'adminController',
    })
    .state('admin.branch', {
      url: '/branch',
      templateUrl: './module/branch/branch.html',
      controller: 'branchController',
    })
    .state('admin.launch', {
      url: '/launch',
      templateUrl: './module/branch/launch.html',
      controller: 'launchController',
    })

}])

/**
 * Created by Administrator on 2016/9/26.
 */
app.directive("hello", function(){
  return {
    restrict: "EA",
    replace: true,
    scope: {
      tempTitle: "=",
      tempLs: "@",
      ngJudge: "=",
      myClick: "&"
    },
    link: function(scope, element, attrs){
      scope.sayHello = function(index){
        scope.ngJudge = index;
        scope.myClick();
      }
    },
    template: "<div class = 'tab'>{{tempLs}}<span ng-class='{active: ngJudge == $index}' ng-repeat='val in tempTitle track by $index' ng-click = 'sayHello($index)'>{{val}}</span></div>",
  }
})

/**
 * Created by Administrator on 2016/8/31.
 */
app.service('clone', function () {
  this.cloneObj = function (obj) {
    var o;
    if (obj.constructor == Object) {
      o = new obj.constructor();
    } else {
      o = new obj.constructor(obj.valueOf());
    }
    for (var key in obj) {
      if (o[key] != obj[key]) {
        if (typeof(obj[key]) == 'object') {
          o[key] = this.obj(obj[key]);
        } else {
          o[key] = obj[key];
        }
      }
    }
    //o.toString = obj.toString;
    //o.valueOf = obj.valueOf;
    return o;
  }
});
app.service("myCookie", function () {
  this.getCookie = function (name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
      return unescape(arr[2]);
    } else {
      return null;
    }
  },
    //设置cookie
    this.setCookie = function (name, value, path, domain, exdays) {
      var d = new Date();
      exdays = exdays ? exdays : 1;
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      var expires = ";expires=" + d.toUTCString();
      document.cookie = name + "=" + value +
        ((path) ? ";path=" + path : "") +
        ((domain) ? ";domain=" + domain : "") +
        expires;
    },
    //清除cookie
    this.clearCookie = function (name, path, domain) {
      if (this.getCookie(name)) {
        document.cookie = name + "=" +
          ((path) ? ";path=" + path : "") +
          ((domain) ? ";domain=" + domain : "") +
          ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
      }
    },
    this.checkCookie = function () {
      var user = this.getCookie("username");
      if (user != "") {
        alert("Welcome again " + user);
      } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
          setCookie("username", user, 365);
        }
      }
    }
});
//headers: {
//  token: myCookie.getCookie("auth_token")
//},
app.service('myHttp', ["$q", "$http", "apiUrl", "$state", "alertify", "myCookie", function ($q, $http, apiUrl, $state, alertify, myCookie) {
  function objInit(data) {
    var obj = {};
    angular.forEach(data, function (result, key) {
      if (angular.isObject(result)) {
        obj[key] = objInit(result);
      } else {
        if (result !== '' && result !== null && result !== undefined) {
          obj[key] = result;
        }
      }
    });
    return obj;
  }

  function http(type, url, data, message) {
    var defer = $q.defer();
    var options = {
      method: type,
      url: apiUrl + url,
      cache: false,
      data: type == 'POST' || type == 'PUT' || type == 'DELETE' ? data : null,
      params: type == 'GET' ? data : null
    };
    $http(options).success(function (data) {
      if (data.res == 'SUCCESS' || data.res == true) {
        defer.resolve(data);
        if (message) {
          alertify.success(message)
        }
      } else if (data.res == 'FAILED') {
        defer.reject(data);
        if (!data.error.code) {
          alertify.error('返回信息不符合规则，超出预料范围，请联系程序员！');
          console.log(data);
          return;
        }
        $state.go('login')
        myCookie.clearCookie("auth_token")
        //switch(data.error.code){
        //  case '20304':
        //    $state.go('login')
        //    myCookie.clearCookie("auth_token")
        //    break;
        //  case '20305':
        //    $state.go('login')
        //    myCookie.clearCookie("auth_token")
        //    break;
        //  case '10010':
        //    $state.go('login')
        //    myCookie.clearCookie("auth_token")
        //    break;
        //  case '10008':
        //    break;
        //  default :
        //    break;
        //}
        alertify.error(data.error.message);
      } else {
        alertify.error('返回数据异常，请联系程序员！');
        console.log(data);
      }
    }).error(function (data, code) {
      alertify.error('HTTP请求错误，请F5刷新或联系开发人员');
      console.log('HTTP错误：', code);
      console.log(data);
    });
    return defer.promise;
  }

  return http;
}]);

/**
 * Created by Administrator on 2016/8/30.
 */
app.controller("branchController", ["$scope", "alertify", "myHttp", function($scope, alertify, myHttp){
  $('.form_datetime').datetimepicker({
    //language:  'fr',
    weekStart: 1,
    todayBtn:  1,
    autoclose: 1,
    todayHighlight: 1,
    startView: 2,
    forceParse: 0,
    showMeridian: 1
  });
}])

/**
 * Created by Administrator on 2016/8/30.
 */
app.controller("loginController", ["$scope", "alertify", "myHttp", "myCookie", "$state", function($scope, alertify, myHttp, myCookie, $state){
  $scope.login = function(){
    //$scope.data.source = "MANAGE_WEB"
    var data = {
      password: "123456",
      source: "MANAGE_WEB",
      userName: "cjj"
    };
    myHttp("POST", "login", data).then(function(data){
      console.log("login_data", data)
      myCookie.setCookie('auth_token',data.token);
      if(data.data.roleInfo && data.data.roleInfo.menuInfo && data.data.roleInfo.menuInfo[0]){
        localStorage.setItem('roleInfo', JSON.stringify(data.data.roleInfo));
        localStorage.setItem('name', data.data.name);
        $state.go("admin.branch")
        alertify.success('登陆成功');
      }else{
        alertify.error('本账户还未分配权限！')
      }
    });

  };

}]);

/**
 * Created by Administrator on 2016/8/30.
 */
app.controller("adminController", ["$scope", "alertify", "myHttp", "myCookie", "$state", "$http", function($scope, alertify, myHttp, myCookie, $state, $http){
  var role=JSON.parse(localStorage.getItem('roleInfo'));
  $http.defaults.headers.common['token']=myCookie.getCookie('auth_token');
  if(role){
    $scope.manageName=localStorage.getItem('name');
    $scope.menuData=role.menuInfo;
  }else{
    $state.go('login');
  }
  $scope.logout = function(){
    myCookie.clearCookie("auth_token");
    $state.go('login');
  }
}]);
