var loginForm = React.createClass({
    handleSubmit:function(e)
    {
      e.preventDefault();
      var userName = React.findDOMNode(this.refs.username).value.trim();
      var isPublisher = React.findDOMNode(this.refs.publisher).checked;
      this.props.handleLogin({userName: userName, userType: +isPublisher});
    },
    render: function () {
      return ( <form className="loginForm col-lg-3 pull-right form-group" onSubmit={this.handleSubmit}>
                <input type="text" ref="username" className="form-control" placeholder="Username"/>
                <div className="checkboxWrapper"> <input ref="publisher" type="checkbox" value="Publisher" /><span>Publisher</span></div>
                <div className="buttonWrapper"><input className="btn btn-default" type="submit" value="Login" /></div>
              </form>
      );
    }
});

module.exports = loginForm;
