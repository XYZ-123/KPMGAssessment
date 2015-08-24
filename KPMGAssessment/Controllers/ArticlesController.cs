using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace KPMGAssessment.Controllers
{
    using System.Threading.Tasks;
    using System.Web.Http.Results;

    using KPMGAssessment.Models;
    using KPMGAssessment.Repositories;
    using Newtonsoft.Json;
    using System.Text;

    [RoutePrefix("api/v1/articles")]
    public class ArticlesController : ApiController
    {
        private readonly IArticlesRepository repository;
        private readonly JsonSerializerSettings serializerSettings = new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore };
        
        public ArticlesController(IArticlesRepository repository)
        {
            if (repository == null)
            {
                throw new ArgumentNullException("repository");
            }

            this.repository = repository;
        }

        [Route("")]
        [HttpGet]
        public async Task<IHttpActionResult> GetAll()
        {
            var articles = await repository.GetAllAsync();
           
            return new JsonResult<IEnumerable<Article>>(articles, serializerSettings, Encoding.Unicode, this);
        }

        [Route("{id}")]
        [HttpGet]
        public async Task<IHttpActionResult> GetOne([FromUri]int id)
        {
            var article = await repository.GetArticleAsync(id);

            if(article == null)
            {
                return new StatusCodeResult(HttpStatusCode.NotFound, this);
            }

            return new JsonResult<Article>(article, serializerSettings, Encoding.Unicode, this);
        }

        [Route("")]
        [HttpPost]
        public async Task<IHttpActionResult> Post([FromBody]Article article)
        {
            try
            {
                var createdArticle = await repository.CreateArticleAsync(article);

                return new JsonResult<Article>(createdArticle, serializerSettings, Encoding.Unicode, this);
            }
            catch(Exception ex)
            {
                return new BadRequestErrorMessageResult(ex.Message, this);
            }
        }

        [Route("{id}")]
        [HttpPut]
        public async Task<IHttpActionResult> Put([FromUri]int id, [FromBody]Article article)
        {
            try
            {
                var updatedArticle = await repository.UpdateArticleAsync(id, article);

                return new JsonResult<Article>(updatedArticle, serializerSettings, Encoding.Unicode, this);
            }
            catch (Exception ex)
            {
                return new BadRequestErrorMessageResult(ex.Message, this);
            }
        }

        [Route("{id}")]
        [HttpDelete]
        public async Task<IHttpActionResult> Delete([FromUri]int id)
        {
            HttpStatusCode returnCode = HttpStatusCode.NoContent;
            try
            {
                await repository.DeleteArticleAsync(id);
            }
            catch
            {
                returnCode = HttpStatusCode.NotFound;
            }

            return new StatusCodeResult(returnCode, this);
        }
    }
}