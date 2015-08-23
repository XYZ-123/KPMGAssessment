var loginForm = React.createClass({
    handleSubmit:function()
    {
      var userName = React.findDOMNode(this.refs.username).value.trim();
      var isPublisher = React.findDOMNode(this.refs.publisher).checked;
      this.props.handleLogin({userName: userName, userType: +isPublisher});
    },
    render: function () {
      return ( <div className="loginForm form-group">
        <input type="text" ref="username" className="form-control" placeholder="Username"/>
        <input ref="publisher" type="checkbox" value="Publisher" /><span>Publisher</span>
        <div className="buttonWrapper"><button onClick={this.handleSubmit} className="btn btn-default">Login</button></div>
      </div> );
    }
});

module.exports = loginForm;
