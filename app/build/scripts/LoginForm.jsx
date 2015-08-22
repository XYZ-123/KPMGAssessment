var loginForm = React.createClass({
    render: function () {
      return(<div className="loginForm form-group">
          <input type="text" className="form-control" placeholder="Username"/>
          <div className="buttonWrapper"><button className="btn btn-default">Login</button></div>
        </div>);
    }
});

module.exports = loginForm;
