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
      return (<div><div>{this.state.isAllowedToPublish ? <ArticleForm onArticleSubmit={this.addNewArticle} /> : null}</div>
        <div>{articleNodes}</div>
      </div>);
    }
});

module.exports = articleList;
