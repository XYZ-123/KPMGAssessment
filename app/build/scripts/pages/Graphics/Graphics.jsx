var graphics = React.createClass({
    render: function () {
      return (<div className="charts"><nav><ul className="nav nav-pills">
        <li role="presentation"><ReactRouter.Link to="likesChart">Likes Chart</ReactRouter.Link></li>
        <li role="presentation"><ReactRouter.Link to="usersChart">Employees vs Publishers</ReactRouter.Link></li>
        <li role="presentation"><ReactRouter.Link to="commentsChart">Comments Chart</ReactRouter.Link></li>
      </ul>
      </nav>
        <ReactRouter.RouteHandler/>
      </div>);
    }
});

module.exports = graphics;
