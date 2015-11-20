var app = angular.module("examApp", []);

app.filter('average', function() {
  return function(grades) {
    var sum = 0;
    var nOfGrades = 0;
    grades.forEach(function(grade){
      if (!isNaN(grade.grade)) {
        nOfGrades++;
        sum += parseInt(grade.grade);
      }
    });
    sum = sum / nOfGrades;
    return sum;
  };
});

app.directive('studentGrades', function() {
  return {
    templateUrl: 'student-grades.html',
    scope: {
      studentsInfo: '=info'
    }
  };
});

app.service('studentsService', [function () {
  var self = this;

  this.studentsInfo = {};
  this.studentsInfo.allCourses = [
    {courseId : 1000,courseName: "Basic Programming"},
    {courseId : 1001,courseName: "Advanced Programming"},
    {courseId : 1003,courseName: "DataBase Intro"}];
  this.studentsInfo.students = [];
  this.studentsInfo.students.push({studentId : 100, name: "Peter Hansen", grades : [{grade: "10"},{grade: "12"},{}]});
  this.studentsInfo.students.push({studentId : 101, name: "Jan Olsen", grades : [{grade: "7"},{grade: "10"},{}]});
  this.studentsInfo.students.push({studentId : 102, name: "Gitte Poulsen", grades : [{grade: "7"},{grade: "7"},{}]});
  this.studentsInfo.students.push({studentId : 103, name: "John McDonald", grades : [{grade: "10"},{},{grade: "7"}]});

  // If I was loading real data from REST API, I would use Angulars $http service to populate objects in this service with data
}]);

app.controller("ExamController", ['studentsService', function(studentsService) {
  this.studentsService = studentsService;
}]);
