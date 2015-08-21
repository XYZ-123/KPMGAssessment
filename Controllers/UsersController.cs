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
    using Newtonsoft.Json;
    using System.Text;
    using System.Net;

    [RoutePrefix("api/v1/users")]
    public class UsersController : ApiController
    {
        private readonly IUsersRepository repository;
        private readonly JsonSerializerSettings serializerSettings = new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore };

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
            var users = await repository.GetAllAsync();

            return new JsonResult<IEnumerable<User>>(users, serializerSettings, Encoding.Unicode, this);
        }

        [Route("{id}")]
        [HttpGet]
        public async Task<IHttpActionResult> GetOne([FromUri]int id)
        {
            var user = await repository.GetUserAsync(id);

            if (user == null)
            {
                return new StatusCodeResult(HttpStatusCode.NotFound, this);
            }

            return new JsonResult<User>(user, serializerSettings, Encoding.Unicode, this);
        }

        [Route("")]
        [HttpPost]
        public async Task<IHttpActionResult> Post([FromBody]User user)
        {
            try
            {
                var createdUser = await repository.CreateUserAsync(user);

                return new JsonResult<User>(createdUser, serializerSettings, Encoding.Unicode, this);
            }
            catch (Exception ex)
            {
                return new BadRequestErrorMessageResult(ex.Message, this);
            }
        }

        [Route("{id}")]
        [HttpPut]
        public async Task<IHttpActionResult> Put([FromUri]int id, [FromBody]User user)
        {
            try
            {
                var updatedUser = await repository.UpdateUserAsync(id, user);

                return new JsonResult<User>(updatedUser, serializerSettings, Encoding.Unicode, this);
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
                await repository.DeleteUserAsync(id);
            }
            catch
            {
                returnCode = HttpStatusCode.NotFound;
            }

            return new StatusCodeResult(returnCode, this);
        }
    }
}