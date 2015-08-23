var Globals = require("../../Globals");
var ArticleForm = require("./ArticleForm");
var Article = require("./Article");

var articleList  = React.createClass({
  getInitialState:function()
  {
    return {articles:[], isAllowedToPublish: this.isAllowedToPublish(), isLoggedIn:this.isLoggedIn()};
  },
  addNewArticle: function(data)
  {
    var currentDate = new Date();
    var self = this;

    var userId = JSON.parse(window.localStorage.getItem(Globals.userIdentity)).Id;
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
        AuthorId: userId
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
  isArticleOwner: function(publisherId)
  {
    if(window.localStorage.getItem(Globals.userIdentity)) {
      var userIdentity = JSON.parse(window.localStorage.getItem(Globals.userIdentity));
      return userIdentity && userIdentity.Id == publisherId;
    }
    return false;
  },
  isLoggedIn:function()
  {
    return !!window.localStorage.getItem(Globals.userIdentity);
  },
  isAllowedToPublish : function()
  {
    if(window.localStorage.getItem(Globals.userIdentity)) {
      var userIdentity = JSON.parse(window.localStorage.getItem(Globals.userIdentity));
      return userIdentity && userIdentity.UserType == 1;
    }
    return false;
  },
  hookToLogin:function()
  {
    var self = this;
    window.addEventListener('storage',function(){
      self.setState({isAllowedToPublish: self.isAllowedToPublish(), isLoggedIn:self.isLoggedIn()});
    });
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
      var isOwner = self.isArticleOwner(article.AuthorId);
      return (<Article data={article} isLoggedIn={self.state.isLoggedIn} isOwner={isOwner} onDelete={self.handleDelete} key={index}/>)
    });
    var todayDate = new Date();
    var articles = this.state.articles.slice().filter(function(article)
    {
      var date = new Date (article.DatePublished);
      return date.toLocaleDateString() == todayDate.toLocaleDateString();
    });
    articles.sort(function(a,b){
        return a.Likes > b.Likes ? -1: a.Likes == b.Likes ? 0 : 1;
      }
    );
    var spotlightArticle = articles.length > 0? articles[0]: {};
    return (<div><div>{this.state.isAllowedToPublish ? <ArticleForm onArticleSubmit={this.addNewArticle} /> : null}</div>
      <div>
        <header>Today spotlight</header>
        {articles.length > 0 ? <Article data={spotlightArticle} isLoggedIn={this.state.isLoggedIn} isOwner={false} onDelete={this.handleDelete} /> : <span>Like articles to get them here!</span>}
      </div>
      <div> <header>News Articles</header>
        {articleNodes}</div>
    </div>);
  }
});

module.exports = articleList;
