/**
 * Created by Administrator on 2016/8/30.
 */
app.controller("loginController", function($scope, alertify, myHttp, myCookie, $state){
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

});
