using KPMGAssessment.Context;
using KPMGAssessment.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace KPMGAssessment.Repositories
{
    public class ArticlesRepository : IArticlesRepository
    {
        public async Task<Article> GetArticleAsync(int id)
        {
            Article article;

            using(var context = new StorageDbContext())
            {
                article = await context.Articles.FindAsync(id);
            }

            return article;
        }

        public async Task<IEnumerable<Article>> GetAllAsync()
        {
            using (var context = new StorageDbContext())
            {
                return context.Articles.ToList();
            }
        }

        public async Task<Article> CreateArticleAsync(Article article)
        {
            Article savedArticle;

            using (var context = new StorageDbContext())
            {
                savedArticle = context.Articles.Add(article);
                await context.SaveChangesAsync();
            }

            return savedArticle;
        }

        public async Task<Article> UpdateArticleAsync(int id, Article article)
        {
            using (var context = new StorageDbContext())
            {
                var articleToUpdate = await context.Articles.FindAsync(id);
                MergeArticles(articleToUpdate, article);
                await context.SaveChangesAsync();
            }
            return article;
        }

        public async Task DeleteArticleAsync(int id)
        {
            using (var context = new StorageDbContext())
            {
                var articleToRemove = await context.Articles.FindAsync(id);
                context.Articles.Remove(articleToRemove);
                await context.SaveChangesAsync();
            }
        }

        private void MergeArticles(Article articleToUpdate, Article article)
        {
            articleToUpdate.Title = article.Body;
            articleToUpdate.Likes = article.Likes;
            articleToUpdate.LastEdited = article.LastEdited;
            articleToUpdate.Body = article.Body;
            articleToUpdate.Comments = articleToUpdate.Comments.Union(article.Comments).ToList();
        }
    }
}