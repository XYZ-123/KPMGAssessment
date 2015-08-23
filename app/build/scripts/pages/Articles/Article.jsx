var Comment = require("./Comment");
var CommentForm = require("./CommentForm");
var Globals = require('../../Globals');

var Article = React.createClass({
  getInitialState:function()
  {
      this.props.data.Comments = this.props.data.Comments || [];
      return {data: this.props.data, editMode: false};
  },
  enableEditMode:function()
  {
    this.setState({editMode:true});
    //React.findDOMNode(this.refs.title).value = this.state.data.Title;
  },
  disableEditMode:function()
  {
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
      self.setState({editMode:false, data:article})
    });
  },
  handleEdit:function(e)
  {
    e.preventDefault();
    var body = React.findDOMNode(this.refs.body).value.trim();
    var title = React.findDOMNode(this.refs.title).value.trim();
    if (!title && !body) {
      return;
    }
    this.updateArticle(title,body,0, this.state.data.Comments, new Date().toISOString());
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
  handleLike:function()
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
  },
  handleDelete:function()
  {
    this.props.onDelete(this.state.data.Id);
  },
  render:function()
  {
    console.log("Loading article", this.state.data);
    var data = this.state.data;
    var commentNodes = data.Comments.map(function(comment)
    {
      return (<Comment author={comment.Author} body={comment.Body} published={comment.Published}/>);
    });
    return this.state.editMode ?
      (<form className="articleform form-group" onSubmit={this.handleEdit}>
        <input className="form-control" placeholder="title" type="text" ref="title" defaultValue={data.Title}/>
        <textarea className="form-control"  placeholder="Enter an article here" ref="body" >{data.Body}</textarea>
        <input className="btn btn-primary" type="submit" value="Save" />
        <button className="btn btn-secondary" onClick={this.disableEditMode} value="Discard">Discard</button>
      </form>)
      :
      (<article className="article">
      <header className="title"><h2> {data.Title}</h2></header>
      <div className="body"> {data.Body}</div>
      <aside className="metaInfo"> <span className="author">{data.Author.Login}</span>
        <span className="likes">{data.Likes}</span>
        {this.props.isLoggedIn ? <span ref="like" onClick={this.handleLike} className="like">Like</span> : null}
        {this.props.isOwner? <button onClick={this.handleDelete}>Delete Me</button>: null}
        {this.props.isOwner? <button onClick={this.enableEditMode}>Edit</button>: null}
        <span className="datePublished">{new Date(data.DatePublished).toUTCString()}</span>
        <span className="lastEdited">{new Date(data.LastEdited).toUTCString()}</span>
      </aside>
      <div className="comments">{commentNodes}</div>
      {this.props.isLoggedIn ? <CommentForm onCommentAdd={this.handleAddComment} /> : null}
    </article>);
  }
});

module.exports = Article;
