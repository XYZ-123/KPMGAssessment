var Articles = require('./pages/Articles/Articles');
var Graphics = require('./pages/Graphics/Graphics');
var LoginForm = require('./LoginForm');
var Globals = require('./Globals');
var LikesChart = require('./pages/Graphics/LikesChart');
var UsersChart = require('./pages/Graphics/EmployeeVsPublisherChart');

var MainWindow = React.createClass({
  getInitialState: function()
  {
    var userName = window.localStorage.getItem(Globals.userIdentity) ? JSON.parse(window.localStorage.getItem(Globals.userIdentity)).Login : "";
    return {isLoggedIn: !!window.localStorage.getItem(Globals.userIdentity), UserName: userName};
  },
  handleLogout:function()
  {
    window.localStorage.removeItem(Globals.userIdentity);
    window.dispatchEvent(new Event('storage'));
    this.setState({isLoggedIn:false, UserName:''});
  },
  onLogin: function(data)
  {
    var self = this;
      fetch(Globals.baseUrl+Globals.usersUrl+'/verify',{ method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Login: data.userName,
          UserType: data.userType
        })
      }).then(function(response) {
        return response.json()
      }).then(function(user) {
        window.localStorage.setItem(Globals.userIdentity, JSON.stringify(user));
        window.dispatchEvent(new Event('storage'));
        self.setState({isLoggedIn: true, UserName: user.Login});
      }).catch(function() {
          fetch(Globals.baseUrl + Globals.usersUrl, {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              Login: data.userName,
              UserType: data.userType
            })
          }).then(function (response) {
            return response.json()
          }).then(function (user) {
            window.localStorage.setItem(Globals.userIdentity, JSON.stringify(user));
            window.dispatchEvent(new Event('storage'));
            self.setState({isLoggedIn: true, UserName: user.Login});
          });
      });

  },
  render:function()
  {
    return (<div>{this.state.isLoggedIn ? <span>Hello,{this.state.UserName}<button onClick={this.handleLogout}>Log out</button></span> :<LoginForm  handleLogin={this.onLogin} />}<h1>Pressford consulting</h1>

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
    <ReactRouter.Route name="graphics" handler={Graphics}>
      <ReactRouter.Route name="likesChart" handler={LikesChart} />
      <ReactRouter.Route name="usersChart" handler={UsersChart} />
    </ReactRouter.Route>
    <ReactRouter.Route name="dummypage1" handler={DummyPage1} />
    <ReactRouter.Route name="dummypage2" handler={DummyPage2}/>
  </ReactRouter.Route>
);

ReactRouter.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});
