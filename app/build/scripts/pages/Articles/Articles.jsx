var Globals = require("../../Globals");
var ArticleForm = require("./ArticleForm");
var Article = require("./Article");

var articleList  = React.createClass({
  getInitialState:function()
  {
    return {articles:[], isAllowedToPublish: this.isAllowedToPublish(), isLoggedIn:this.isLoggedIn(), someFlag:false};
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
    }).then(function(article) {
      var articles = self.state.articles.slice();
      articles.unshift(article);
      self.setState({articles:[]});
      self.setState({articles: articles});
    });
  },
  handleLike:function(id, likeDelta)
  {
    debugger;
    var userIdentity = JSON.parse(window.localStorage.getItem(Globals.userIdentity));
    if(userIdentity.ArticlesLiked || likeDelta == 1)
    {
      debugger;
      if(likeDelta == -1) {
        userIdentity.ArticlesLiked.splice(userIdentity.ArticlesLiked.indexOf(id), 1);
      }
      else {
        if(!userIdentity.ArticlesLiked)
          userIdentity.ArticlesLiked = [];
        userIdentity.ArticlesLiked.push(id);
      }
      fetch(Globals.baseUrl+Globals.usersUrl+"/"+userIdentity.Id,{
        method: 'put',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Login: userIdentity.Login,
          UserType: userIdentity.UserType,
          ArticlesLiked: JSON.stringify(userIdentity.ArticlesLiked)
        })}).then(function(response)
      {
        window.localStorage.setItem(Globals.userIdentity, JSON.stringify(userIdentity));

      });
    }
  },
  handleDelete:function(id)
  {
    var self = this;
    fetch(Globals.baseUrl + Globals.articlesUrl+'/'+id,{
      method:'delete'
    }).then(function(response) {
        var articles = self.state.articles.slice().filter(function(art)
        {
          return art.Id != id
        });
        self.handleLike(id, -1);
        self.setState({articles:[]});
        self.setState({articles: articles});
        self.forceUpdate();
      }
    );
  },
  loadArticlesFromServer: function()
  {
    var self = this;
    fetch(Globals.baseUrl+Globals.articlesUrl).then(function(response) {
      return response.json()
    }).then(function(articles) {
      articles.sort(function(a,b){
          var aDatePublished= new Date(a.DatePublished);
          var bDatePublished= new Date(b.DatePublished);
          return aDatePublished > bDatePublished ? -1: aDatePublished == bDatePublished ? 0 : 1;
        }
      );
      self.setState({articles:[]});
      self.setState({articles:articles});
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
  wasArticleLiked:function(id)
  {
    debugger;
      var user = JSON.parse(window.localStorage.getItem(Globals.userIdentity));
      return !!user && !!user.ArticlesLiked && user.ArticlesLiked.indexOf(id) > -1;
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
      var articleLiked = self.wasArticleLiked(article.Id);
      console.log(articleLiked);
      debugger;
      return (<Article data={article} isLoggedIn={self.state.isLoggedIn} articleUpdated={self.loadArticlesFromServer} articleLiked={articleLiked} onArticleLike={self.handleLike} isOwner={isOwner} onDelete={self.handleDelete} key={index}/>)
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
    var spotlightArticleLiked = this.wasArticleLiked(spotlightArticle.Id);
    return (<div className="articles col-lg-offset-2 col-md-offset-2 col-lg-6 col-md-6">{this.state.isAllowedToPublish ? <ArticleForm onArticleSubmit={this.addNewArticle} /> : null}
      <div className="spotlight">
        <header>Today's spotlight</header>
        {articles.length > 0 ?
          <Article data={spotlightArticle} articleUpdated={this.loadArticlesFromServer} articleLiked={spotlightArticleLiked} onArticleLike={this.handleLike} isLoggedIn={this.state.isLoggedIn} isOwner={false} onDelete={this.handleDelete} />
          : <span>Like articles to get them here!</span>}
      </div>
      <div>
        <header>News Articles</header>
        {articleNodes.length > 0? articleNodes:<div className="welcome"><p><img className="noarticles" src="../../../images/sad-smiley-face.png"/>No articles yet.</p>Login as publisher to add your awesome news here!</div>}
      </div>
    </div>);
  }
});

module.exports = articleList;
