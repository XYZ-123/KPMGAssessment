using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KPMGAssessment.Repositories
{
    public class UsersRepository : IUsersRepository
    {
        public System.Threading.Tasks.Task<Models.User> GetUserAsync(int id)
        {
            throw new NotImplementedException();
        }

        public System.Threading.Tasks.Task<IEnumerable<Models.User>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public System.Threading.Tasks.Task<Models.User> CreateUserAsync(Models.User User)
        {
            throw new NotImplementedException();
        }

        public System.Threading.Tasks.Task<Models.User> UpdateUserAsync(int id, Models.User User)
        {
            throw new NotImplementedException();
        }

        public System.Threading.Tasks.Task DeleteUserAsync(int id)
        {
            throw new NotImplementedException();
        }
    }
}