var Welcome = React.createClass({
    render: function () {
      return (<div className="welcome">
        <header><h1>Welcome to Pressford Consulting News!</h1>
        <h2>Here you can:</h2></header>
        <ul>
          <li><span className="glyphicon glyphicon-ok"></span>Read latest news articles</li>
          <li><span className="glyphicon glyphicon-ok"></span>Publish new newsarticles</li>
          <li><span className="glyphicon glyphicon-ok"></span>View user activity</li>
          <li><span className="glyphicon glyphicon-ok"></span>Visit Another Page</li>
          <li><span className="glyphicon glyphicon-ok"></span>Get one more page for free</li>
        </ul>
      </div>)
    }
});

module.exports = Welcome;
