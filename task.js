/**
 * Created by Administrator on 2016/8/31.
 */
app.service("myHttp", function($q, $http, $state, alertify, myCookie, apiUrl){
  var defer = $q.defer();
  function http(type, url, data, message){
    var options = {
      method: type,
      url: apiUrl + url,
      headers: {
        token: myCookie.getCookie("auth_token")
      },
      cache: false,
      data: type == 'POST' || type == 'PUT' || type == 'DELETE'? data: null,
      params: type == 'GET'? data: null
    }
    $http(options).success(function(data,code){
      if(data.res=='SUCCESS' || data.res==true){
        defer.resolve(data);
        if(message){
          alertify.success(message);
        }
      }else if(data.res=='FAILED'){
        defer.reject(data);
        if(!data.error.code){
          alertify.error('返回信息不符合规则，超出预料范围，请联系程序员！');
          console.log(data);
          return;
        }else{
          $state.go('login')
          myCookie.clearCookie("auth_token")
          alertify.error(data.error.message)
        }
      }else{
        alertify.error('返回数据异常，请联系程序员！')
        console.log(data)
      }
    }).error(function(data,code){
      alertify.error('HTTP请求错误，请F5刷新或联系开发人员')
      console.log('HTTP错误：',code)
      console.log(data)
    });
    return defer.promise;
  }
  return http;
})
