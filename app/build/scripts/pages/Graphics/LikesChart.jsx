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
                fillColor: "rgba(58, 138, 187, 0.5)",
                strokeColor: "rgba(58, 138, 187, 1)",
                pointColor: "#fafafa",
                pointStrokeColor: "#fefefe",
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
