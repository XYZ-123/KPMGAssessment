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
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
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
