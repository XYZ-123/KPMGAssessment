var Comment = require("./Comment");
var CommentForm = require("./CommentForm");
var ArticleEditForm = require("./ArticleEditForm");
var Globals = require('../../Globals');

var Article = React.createClass({
  getInitialState:function()
  {
      this.props.data.Comments = this.props.data.Comments || [];
      return {data: this.props.data, editMode: false, commentsVisible: false};
  },
  enableEditMode:function(e)
  {
    e.preventDefault();
    this.setState({editMode:true});
    //React.findDOMNode(this.refs.title).value = this.state.data.Title;
  },
  disableEditMode:function(e)
  {
    e.preventDefault();
    this.setState({editMode:false});
  },
  updateArticle: function(title, body, likeDelta, comments, lastEdited)
  {
    var self = this;
    fetch(Globals.baseUrl+Globals.articlesUrl+"/"+this.state.data.Id,{
      method: 'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Title: title,
        Body: body,
        DatePublished: this.state.data.DatePublished,
        LastEdited: lastEdited,
        Likes: this.state.data.Likes + likeDelta,
        Comments: comments
      })}).then(function(response) {
      return response.json()
    }).then(function(article) {
      self.setState({editMode:false, data:article});
      // Notify parent to re-render if needed
      //self.props.articleUpdated();
    });
  },
  handleEdit:function(data)
  {
    this.updateArticle(data.title,data.body,0, this.state.data.Comments, new Date().toISOString());
  },
  handleAddComment: function(data)
  {
    var stateData = this.state.data;
    var user = JSON.parse(window.localStorage.getItem(Globals.userIdentity));
    var comment = {Body:data.comment, Published: new Date().toISOString(), Author:user.Login};
    var comments = this.state.data.Comments;
    comments.push(comment);
    this.updateArticle(stateData.Title, stateData.Body, 0, comments, stateData.LastEdited);
  },
  handleLike: function()
  {
    var data = this.state.data;
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
    this.updateArticle(data.Title, data.Body, likeDelta, data.Comments, data.LastEdited);
    this.props.onArticleLike(data.Id, likeDelta);
  },
  handleDelete:function(e)
  {
    e.preventDefault();
    this.props.onDelete(this.state.data.Id);
  },
  toggleFullView:function()
  {
    console.log("clicked");
  },
  openComments: function()
  {
    this.setState({commentsVisible:!this.state.commentsVisible});
  },
  render:function()
  {
    var data = this.state.data;
    var commentNodes = data.Comments.map(function(comment)
    {
      return (<Comment author={comment.Author} body={comment.Body} published={comment.Published}/>);
    });
    return (
          <article  className="article">
              <span className="datePublished">Published at {new Date(data.DatePublished).toLocaleTimeString()} on {new Date(data.DatePublished).toLocaleDateString()}</span>
              {this.state.editMode ?
                  <ArticleEditForm title={data.Title} body={data.Body} onDiscard={this.disableEditMode} onEditSubmit={this.handleEdit}/>
                  :
                  <div><header onClick={this.toggleFullView} className="title"><h2> {data.Title}</h2></header>
                  <div className="body"> {data.Body}</div></div>
              }
              <aside className="metaInfo"> <span className="glyphicon glyphicon-user"></span><span className="author">{data.Author.Login}</span>
              <div className="likegroup">
                <span> Likes  <span className="likes">{data.Likes}</span></span>
                {this.props.isLoggedIn ?
                <span ref="like" onClick={this.handleLike} className={this.props.articleLiked ? "liked like": "like"}><span className="glyphicon glyphicon-thumbs-up"></span></span>
                : null}
              </div>
              <a className="viewComments" href="javascript:void(0)" onClick={this.openComments}>View Comments ({data.Comments.length})</a>
            {
              this.props.isOwner?
                <div className="tools"><a href="" onClick={this.handleDelete}><span className="glyphicon glyphicon-remove" ></span></a>
                <a href="" onClick={this.enableEditMode}><span className="glyphicon glyphicon-pencil" ></span></a></div>
                : null}
              <span className="lastEdited">Last edited:  {new Date(data.LastEdited).toLocaleTimeString()} {new Date(data.LastEdited).toLocaleDateString()}</span>
              </aside>
          {
            this.state.commentsVisible?
              <div>
                <div className="comments">{commentNodes}</div>
              {this.props.isLoggedIn ? <CommentForm onCommentAdd={this.handleAddComment} /> : null}
              </div>
              :null}
          </article>);
  }
});

module.exports = Article;
