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
