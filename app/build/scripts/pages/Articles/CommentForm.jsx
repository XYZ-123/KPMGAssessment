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
        <textarea  placeholder="Add comment to article above" ref="text" ></textarea>
        <input className="btn btn-primary" type="submit" value="Post" />
      </form>);
    }
});

module.exports = CommentForm;
