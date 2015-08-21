using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KPMGAssessment.Controllers
{
    using System.Net.Http;
    using System.Threading.Tasks;
    using System.Web.Http;
    using System.Web.Http.Results;

    using KPMGAssessment.Models;
    using KPMGAssessment.Repositories;

    [RoutePrefix("api/v1/users")]
    public class UsersController : ApiController
    {
        private readonly IUsersRepository repository;

        public UsersController(IUsersRepository repository)
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
        public async Task<IHttpActionResult> Post([FromBody]User user)
        {
            return new OkResult(new HttpRequestMessage());
        }

        [Route("{id}")]
        [HttpPut]
        public void Put([FromUri]int id, [FromBody]User user)
        {
        }

        [Route("{id}")]
        [HttpDelete]
        public void Delete([FromUri]int id)
        {
        }
    }
}