var Globals = require("../../Globals");
var ArticleForm = require("./ArticleForm");
var Article = require("./Article");

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
