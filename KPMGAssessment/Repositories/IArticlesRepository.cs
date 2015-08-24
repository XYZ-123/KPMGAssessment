using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KPMGAssessment.Repositories
{
    using System.Threading.Tasks;

    using KPMGAssessment.Models;

    public interface IArticlesRepository
    {
        Task<Article> GetArticleAsync(int id);

        Task<IEnumerable<Article>> GetAllAsync();

        Task<Article> CreateArticleAsync(Article article);

        Task<Article> UpdateArticleAsync(int id, Article article);

        Task DeleteArticleAsync(int id);
    }
}