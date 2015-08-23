var Globals = require('../../Globals');

var EmployeesVsPublishers= React.createClass({
    componentDidMount:function()
    {
      var ctx = document.getElementById("EvPChart").getContext("2d");
      fetch(Globals.baseUrl+Globals.usersUrl).then(function(response) {
        return response.json()
      }).then(function(users)
      {
     var employees = users.filter(function(user){return user.UserType==0});
        var publishers = users.filter(function(user){return user.UserType==1});
      var data = {labels:['Employees Publishers'], datasets:[{
        label: "Employees",
        fillColor: "rgba(220,220,220,0.6)",
        strokeColor: "rgba(220,220,220,0.8)",
        highlightFill: "rgba(220,220,220,0.75)",
        highlightStroke: "rgba(220,220,220,1)",
        data: [employees.length]
      },
        {
          label: "Publishers",
          fillColor: "rgba(151,187,205,0.6)",
          strokeColor: "rgba(151,187,205,0.8)",
          highlightFill: "rgba(151,187,205,0.75)",
          highlightStroke: "rgba(151,187,205,1)",
          data: [publishers.length]
        }]};
      var EvPChart = new Chart(ctx).Bar(data);

      });
    },
    render: function () {
      return (<div><canvas id="EvPChart"></canvas></div>)
    }
});

module.exports = EmployeesVsPublishers;
