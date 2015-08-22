var Articles = require('./pages/Articles');
var Graphics = require('./pages/Graphics');
var LoginForm = require('./LoginForm');

var MainWindow = React.createClass({
  render:function()
  {
    return (<div><LoginForm /><h1>Pressford consulting</h1>

      <ul className="nav nav-pills">
        <li role="presentation"><ReactRouter.Link to="articles">Articles</ReactRouter.Link></li>
        <li role="presentation"><ReactRouter.Link to="graphics">Graphics</ReactRouter.Link></li>
        <li role="presentation"><ReactRouter.Link to="dummypage1">Another page</ReactRouter.Link></li>
        <li role="presentation"><ReactRouter.Link to="dummypage2">One more page</ReactRouter.Link></li>

      </ul>
    <ReactRouter.RouteHandler/>
    </div>);
  }
});

var DummyPage1 = React.createClass({
  render:function() {
    return (<div className="placeholder"><p>I am dummy page 1</p></div>);
  }
});

var DummyPage2 = React.createClass({
  render:function() {
    return (<div className="placeholder"><p>I am dummy page 2</p></div>);
  }
});
var routes = (
  <ReactRouter.Route handler={MainWindow} path="/">
    <ReactRouter.DefaultRoute handler={Articles} />
    <ReactRouter.Route name="articles" handler={Articles} />
    <ReactRouter.Route name="graphics" handler={Graphics}/>
    <ReactRouter.Route name="dummypage1" handler={DummyPage1} />
    <ReactRouter.Route name="dummypage2" handler={DummyPage2}/>
  </ReactRouter.Route>
);

ReactRouter.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});
