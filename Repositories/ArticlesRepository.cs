using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KPMGAssessment.Repositories
{
    public class ArticlesRepository : IArticlesRepository
    {
        public System.Threading.Tasks.Task<Models.Article> GetArticleAsync(int id)
        {
            throw new NotImplementedException();
        }

        public System.Threading.Tasks.Task<IEnumerable<Models.Article>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public System.Threading.Tasks.Task<Models.Article> CreateArticleAsync(Models.Article article)
        {
            throw new NotImplementedException();
        }

        public System.Threading.Tasks.Task<Models.Article> UpdateArticleAsync(int id, Models.Article article)
        {
            throw new NotImplementedException();
        }

        public System.Threading.Tasks.Task DeleteArticleAsync(int id)
        {
            throw new NotImplementedException();
        }
    }
}