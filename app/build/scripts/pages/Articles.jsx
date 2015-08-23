var Globals = require("../Globals");

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

var articleList  = React.createClass({
    addNewArticle: function(data)
    {
        var currentDate = new Date();
        var self = this;
        fetch(Globals.baseUrl + Globals.articlesUrl,{  method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            Title: data.title,
            Body: data.body,
            DatePublished: currentDate.toISOString(),
            LastEdited: currentDate.toISOString(),
            AuthorId: window.localStorage.getItem(Globals.userIdKey)
          })
        }).then(function(response) {
              return response.json()
        }).then(function(json) {
          self.state.articles.push(json);
          self.setState({articles:self.state.articles});
        });
    },
    handleDelete:function(id)
    {
      var self = this;
      fetch(Globals.baseUrl + Globals.articlesUrl+'/'+id,{
        method:'delete'
      }).then(function() {
        fetch(Globals.baseUrl+Globals.articlesUrl).then(function(response) {
          return response.json()
        }).then(function(json) {
          self.setState({articles:json});
        });
      });
    },
    loadArticlesFromServer: function()
    {
      var self = this;
      fetch(Globals.baseUrl+Globals.articlesUrl).then(function(response) {
        return response.json()
      }).then(function(json) {
        self.setState({articles:json});
      });
    },
    hookToLogin:function()
    {
      var self = this;
      window.addEventListener('storage',function(){
          self.setState({isLoggedIn:!!window.localStorage.getItem(Globals.userIdKey)});
      });
    },
    getInitialState:function()
    {
      return {articles:[], isLoggedIn:!!window.localStorage.getItem(Globals.userIdKey)};
    },
    componentDidMount:function()
    {
      this.loadArticlesFromServer();
      this.hookToLogin();
    },
    componentWillUnmount:function()
    {
      window.removeEventListener('storage');
    },
    render: function () {
      var self = this;
      var articleNodes = this.state.articles.map(function(article, index)
      {
        return (<Article data={article} onDelete={self.handleDelete} key={index}/>)
      });
      return (<div><div>{this.state.isLoggedIn ? <ArticleForm onArticleSubmit={this.addNewArticle} /> : null}</div>
        <div>{articleNodes}</div>
      </div>);
    }
});

module.exports = articleList;
