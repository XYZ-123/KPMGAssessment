var Comment = require("./Comment");

var Article = React.createClass({
  handleDelete:function()
  {
    this.props.onDelete(this.props.data.Id);
  },
  render:function()
  {
    this.props.data.Comments = this.props.data.Comments || [];
    var commentNodes = this.props.data.Comments.map(function(comment)
    {
      return (<Comment author={comment.Author} body={comment.Body}/>);
    });

    return (<article className="article">
      <header className="title"><h2> {this.props.data.Title}</h2></header>
      <div className="body"> {this.props.data.Body}</div>
      <aside className="metaInfo"> <span className="author">{this.props.data.Author.Login}</span>
        <span className="likes">{this.props.data.Likes}</span>
        <span className="datePublished">{new Date(this.props.data.DatePublished).toUTCString()}</span>
        <span className="lastEdited">{new Date(this.props.data.LastEdited).toUTCString()}</span>
      </aside>
      <div className="comments">{commentNodes}</div>
      <button onClick={this.handleDelete}>Delete Me</button>
    </article>);
  }
});

module.exports = Article;
