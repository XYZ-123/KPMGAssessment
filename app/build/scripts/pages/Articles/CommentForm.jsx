var CommentForm = React.createClass({
    handleSubmit: function(e)
    {
        e.preventDefault();
        var comment = React.findDOMNode(this.refs.text).value.trim();
        if(!comment)
        {
          return;
        }
        this.props.onCommentAdd({comment:comment});
        React.findDOMNode(this.refs.text).value = '';
    },
    render: function () {
      return ( <form className="commentForm form-group" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Add comment to article above" ref="text" />
        <input type="submit" value="Post" />
      </form>);
    }
});

module.exports = CommentForm;
