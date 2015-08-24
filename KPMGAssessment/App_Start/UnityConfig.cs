using Microsoft.Practices.Unity;
using System.Web.Http;
using Unity.WebApi;

namespace KPMGAssessment
{
    using KPMGAssessment.Repositories;

    public static class UnityConfig
    {
        public static void RegisterComponents(HttpConfiguration config)
        {
			var container = new UnityContainer();

            container.RegisterInstance<IArticlesRepository>(new ArticlesRepository());
            container.RegisterInstance<IUsersRepository>(new UsersRepository());
            
            config.DependencyResolver = new UnityDependencyResolver(container);
        }
    }
}