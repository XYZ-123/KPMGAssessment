var ArticleEditForm = React.createClass({
    handleEdit:function(e)
    {
      e.preventDefault();
      var body = React.findDOMNode(this.refs.body).value.trim();
      var title = React.findDOMNode(this.refs.title).value.trim();
      if (!title && !body) {
        return;
      }
      this.props.onEditSubmit({body:body, title:title});
    },
    render: function () {
      return(<form className="editForm form-group" onSubmit={this.handleEdit}>
                <input className="form-control" placeholder="title" type="text" ref="title" defaultValue={this.props.title}/>
                <textarea className="form-control"  placeholder="Enter an article here" ref="body" >{this.props.body}</textarea>
                <input className="btn btn-primary" type="submit" value="Save" />
                <button className="btn btn-secondary" onClick={this.props.onDiscard} value="Discard">Discard</button>
            </form>)
    }
});

module.exports = ArticleEditForm;
