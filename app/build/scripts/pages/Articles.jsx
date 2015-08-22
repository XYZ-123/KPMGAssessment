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
    React.findDOMNode(this.refs.text).value = '';
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
  render:function()
  {
    var commentNodes = this.props.data.Comments.map(function(comment)
    {
      return (<Comment author={comment.Author} body={comment.Body}/>);
    });

    return (<article className="article">
                  <header className="title"><h2> {this.props.data.Title}</h2></header>
                  <div className="body"> {this.props.data.body}</div>
                  <aside className="metaInfo"> <span className="author">{this.props.data.Author.Login}</span>
                    <span className="likes">{this.props.data.Likes}</span>
                    <span className="datePublished">{new Date(this.props.data.DatePublished).toUTCString()}</span>
                    <span className="lastEdited">{new Date(this.props.data.LastEdited).toUTCString()}</span>
                  </aside>
                  <div className="comments">{commentNodes}</div>
            </article>);
  }
});

var articleList  = React.createClass({
    addNewArticle: function(data)
    {
        var currentDate = new Date();
        fetch(Globals.baseUrl + Globals.articlesUrl,{  method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            Title: data.title,
            Body: data.body,
            DatePublished: currentDate.toISOString(),
            AuthorId: window.localStorage.getItem('KPMG_User_Id')
          })
        }).then(function(response) {
          return response.json()
        }).then(function(json) {
          self.setState({articles:this.state.articles.push(json)});
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
    getInitialState:function()
    {
      return {articles:[]};
    },
    componentDidMount:function()
    {
      this.loadArticlesFromServer();
    },
    render: function () {
      var articleNodes = this.state.articles.map(function(article)
      {
        return (<Article data={article} />)
      });
      return (<div><div>{this.props.LoggedIn ? <ArticleForm onArticleSubmit={this.addNewArticle} /> : null}</div>
        <div>{articleNodes}</div>
      </div>);
    }
});

module.exports = articleList;
