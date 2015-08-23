var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
        <h4 className="commentAuthor">
          {this.props.author}
        </h4>
        <span>{this.props.body}</span>
        <span>{this.props.published}</span>
      </div>
    );
  }
});
module.exports = Comment;
