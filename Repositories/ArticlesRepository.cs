using KPMGAssessment.Context;
using KPMGAssessment.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
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

            using (var context = new StorageDbContext())
            {
                article = await context.Articles.FindAsync(id);
            }

            return article;
        }

        public async Task<IEnumerable<Article>> GetAllAsync()
        {
            using (var context = new StorageDbContext())
            {
                return context.Articles.Include("Author").Include("Comments").Include("Author").ToList();
            }
        }

        public async Task<Article> CreateArticleAsync(Article article)
        {
            Article savedArticle;

            using (var context = new StorageDbContext())
            {
                savedArticle = context.Articles.Add(article);
                await context.SaveChangesAsync();
                savedArticle = context.Articles.Include("Author").Include("Comments").Include("Author").Where(a => a.Id == savedArticle.Id).FirstOrDefault();
            }

            return savedArticle;
        }

        public async Task<Article> UpdateArticleAsync(int id, Article article)
        {
            using (var context = new StorageDbContext())
            {
                var articleToUpdate = context.Articles.Include("Author").Include("Comments").Include("Author").Where(a => a.Id == id).FirstOrDefault();
                
                MergeArticles(articleToUpdate, article, context);
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

        private void MergeArticles(Article articleToUpdate, Article article, StorageDbContext context)
        {
            articleToUpdate.Title = article.Body;
            articleToUpdate.Likes = article.Likes;
            articleToUpdate.LastEdited = article.LastEdited;
            articleToUpdate.Body = article.Body;
            foreach(var comment in article.Comments)
            {
                // Comment wasn't added
                if(comment.Id == 0)
                {
                    context.Entry(comment.Author).State = EntityState.Unchanged;
                    articleToUpdate.Comments.Add(comment);
                }
            }
        }
    }
}