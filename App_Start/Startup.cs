using KPMGAssessment;

using Microsoft.Owin;

[assembly:OwinStartup(typeof(Startup))]
namespace KPMGAssessment
{
    using System.Web.Http;
    using System.Web.Http.Cors;
    using System.Web.UI.WebControls;

    using Microsoft.Owin.Cors;

    using Owin;

    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var config = new HttpConfiguration();

            // Setting up configuration
            RouteConfig.RegisterRoutes(config);
            FormatterConfig.RegisterFormatters(config);
            UnityConfig.RegisterComponents(config);
            
            app.UseWebApi(config);
        }
    }
}