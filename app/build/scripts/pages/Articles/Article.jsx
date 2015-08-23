var Comment = require("./Comment");
var CommentForm = require("./CommentForm");
var Globals = require('../../Globals');

var Article = React.createClass({
  getInitialState:function()
  {
    var comments = this.props.data.Comments || [];
    var likes = this.props.data.Likes;
    return {comments: comments, likes: likes};
  },
  updateArticle: function(likeDelta, comments)
  {
    var self = this;
    fetch(Globals.baseUrl+Globals.articlesUrl+"/"+this.props.data.Id,{
      method: 'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Title: this.props.data.Title,
        Body: this.props.data.Body,
        DatePublished: this.props.data.DatePublished,
        LastEdited: this.props.data.LastEdited,
        Likes: this.state.likes + likeDelta,
        Comments: comments
      })}).then(function(response) {
      return response.json()
    }).then(function(article) {
        self.setState({comments: article.Comments, likes: article.Likes});
    })
  },
  handleAddComment: function(data)
  {
    debugger;
    var user = JSON.parse(window.localStorage.getItem(Globals.userIdentity));
    var comment = {Body:data.comment, Published: new Date().toISOString(),AuthorId: user.Id,Author:user};
    var comments = this.state.comments;
    comments.push(comment);
    this.updateArticle(0,comments);
  },
  handleLike:function()
  {
      var likedClassName = 'liked';
      var like = React.findDOMNode(this.refs.like);
      var likeDelta;
      if(!like.classList.contains(likedClassName))
      {
          like.classList.add(likedClassName);
          likeDelta = 1;
      }
      else
      {
          like.classList.remove(likedClassName);
          likeDelta = -1;
      }
      this.updateArticle(likeDelta,this.state.comments);
  },
  handleDelete:function()
  {
    this.props.onDelete(this.props.data.Id);
  },
  render:function()
  {

    var commentNodes = this.state.comments.map(function(comment)
    {
      return (<Comment author={comment.Author} body={comment.Body}/>);
    });

    return (<article className="article">
      <header className="title"><h2> {this.props.data.Title}</h2></header>
      <div className="body"> {this.props.data.Body}</div>
      <aside className="metaInfo"> <span className="author">{this.props.data.Author.Login}</span>
        <span className="likes">{this.state.likes}</span>
        {this.props.isLoggedIn ? <span ref="like" onClick={this.handleLike} className="like">Like</span> : null}
        {this.props.isOwner? <button onClick={this.handleDelete}>Delete Me</button>: null}
        <span className="datePublished">{new Date(this.props.data.DatePublished).toUTCString()}</span>
        <span className="lastEdited">{new Date(this.props.data.LastEdited).toUTCString()}</span>
      </aside>
      <div className="comments">{commentNodes}</div>
      {this.props.isLoggedIn ? <CommentForm onCommentAdd={this.handleAddComment} /> : null}
    </article>);
  }
});

module.exports = Article;
