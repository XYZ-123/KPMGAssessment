var Globals = require('../../Globals');

var LikesChart = React.createClass({
    componentDidMount:function()
    {
      var ctx = document.getElementById('LikesChart').getContext("2d");
      fetch(Globals.baseUrl+Globals.articlesUrl).then(function(response) {
        return response.json()
      }).then(function(articles)
        {
          var labels = articles.map(function(article) {return article.Title});
          var likesPlotted = articles.map(function(article) {return article.Likes});
          var data = {
            labels:labels,
            datasets: [
              {
                label: "Likes",
                fillColor: "rgba(170, 199, 92, 1)",
                strokeColor: "rgba(90, 111, 32, 1)",
                pointColor: "#fafafa",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: likesPlotted
              }]};
          var likesChart = new Chart(ctx).Line(data);

        });
    },
    render: function () {
      return(<div><canvas id="LikesChart"></canvas></div>);
    }
});

module.exports = LikesChart;
