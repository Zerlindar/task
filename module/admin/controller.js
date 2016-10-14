/**
 * Created by Administrator on 2016/8/30.
 */
app.controller("adminController", function($scope, alertify, myHttp, myCookie, $state, $http){
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
});
