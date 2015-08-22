var Articles = require('./pages/Articles');
var Graphics = require('./pages/Graphics');

debugger;
var MainWindow = React.createClass({
  render:function()
  {
    return (<div><h1>I am main window</h1>
      <ul>
        <li><ReactRouter.Link to="articles">Articles</ReactRouter.Link></li>
        <li><ReactRouter.Link to="graphics">Graphics</ReactRouter.Link></li>
      </ul>
    <ReactRouter.RouteHandler/>
    </div>);
  }
});

var routes = (
  <ReactRouter.Route handler={MainWindow} path="/">
    <ReactRouter.DefaultRoute handler={Articles} />
    <ReactRouter.Route name="articles" handler={Articles} />
    <ReactRouter.Route name="graphics" handler={Graphics}/>
  </ReactRouter.Route>
);

ReactRouter.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});
