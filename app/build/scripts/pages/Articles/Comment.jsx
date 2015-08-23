var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
        <h4 className="commentAuthor">
          {this.props.author.Login}
        </h4>
        <span>{this.props.body}</span>
      </div>
    );
  }
});
module.exports = Comment;
