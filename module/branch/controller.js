/**
 * Created by Administrator on 2016/8/30.
 */
app.controller("branchController", function($scope, alertify, myHttp){
  $('.form_datetime').datetimepicker({
    language:  'zh-CN',
    weekStart: 1,
    todayBtn:  1,
    autoclose: 1,
    todayHighlight: 1,
    startView: 2,
    forceParse: 0,
    showMeridian: 1
  });
})
