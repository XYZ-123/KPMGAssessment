var ArticleForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var body = React.findDOMNode(this.refs.body).value.trim();
    var title = React.findDOMNode(this.refs.title).value.trim();
    if (!title && !body) {
      return;
    }
    this.props.onArticleSubmit({title:title, body: body});
    React.findDOMNode(this.refs.title).value = '';
    React.findDOMNode(this.refs.body).value = '';
  },
  render:function(){
    return( <form className="form-group" onSubmit={this.handleSubmit}>
      <input className="form-control" type="text" placeholder="Enter an title here" ref="title" />
      <input className="form-control" type="textarea" placeholder="Enter an article here" ref="body" />
      <input className="btn btn-primary" type="submit" value="Create article" />
    </form>);
  }
});

module.exports = ArticleForm;
