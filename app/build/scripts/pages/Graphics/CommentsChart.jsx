var Globals = require('../../Globals');

var CommentsChart = React.createClass({
  componentDidMount:function()
  {
    var ctx = document.getElementById('CommentsChart').getContext("2d");
    fetch(Globals.baseUrl+Globals.articlesUrl).then(function(response) {
      return response.json()
    }).then(function(articles)
    {
      var labels = articles.map(function(article) {return article.Title});
      var commentsPlotted = articles.map(function(article) {return article.Comments.length});
      var data = {
        labels:labels,
        datasets: [
          {
            label: "Likes",
            fillColor: "rgba(58, 138, 187, 0.5)",
            strokeColor: "rgba(58, 138, 187, 1)",
            pointColor: "#fafafa",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: commentsPlotted
          }]};
      var likesChart = new Chart(ctx).Line(data);

    });
  },
  render: function () {
    return(<div><canvas id="CommentsChart"></canvas></div>);
  }
});

module.exports = CommentsChart;

