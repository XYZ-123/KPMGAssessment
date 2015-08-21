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

    [RoutePrefix("api/v1/articles")]
    public class ArticlesController : ApiController
    {
        private readonly IArticlesRepository repository;

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
            return new OkResult(new HttpRequestMessage());
        }

        [Route("{id}")]
        [HttpGet]
        public async Task<IHttpActionResult> GetOne([FromUri]int id)
        {
            return new OkResult(new HttpRequestMessage());
        }

        [Route("")]
        [HttpPost]
        public async Task<IHttpActionResult> Post([FromBody]Article article)
        {
            return new OkResult(new HttpRequestMessage());
        }

        [Route("{id}")]
        [HttpPut]
        public async Task<IHttpActionResult> Put([FromUri]int id, [FromBody]Article article)
        {
            return new OkResult(new HttpRequestMessage());
        }

        [Route("{id}")]
        [HttpDelete]
        public void Delete([FromUri]int id)
        {
        }
    }
}