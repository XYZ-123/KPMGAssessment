var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">

          <span className="datePublished">{new Date(this.props.published).toLocaleTimeString()} {new Date(this.props.published).toLocaleDateString()}</span>
          <h4 className="commentAuthor">
            <span className="glyphicon glyphicon-user"></span> {this.props.author} commented:
        </h4>
        <span className="body">{this.props.body}</span>

      </div>
    );
  }
});
module.exports = Comment;
