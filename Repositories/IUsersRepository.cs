using System.Collections.Generic;

namespace KPMGAssessment.Repositories
{
    using System.Threading.Tasks;

    using KPMGAssessment.Models;

    public interface IUsersRepository
    {
        Task<User> GetUserAsync(int id);

        Task<IEnumerable<User>> GetAllAsync();

        Task<User> CreateUserAsync(User user);

        Task<User> FindUserAsync(User user);

        Task<User> UpdateUserAsync(int id, User user);

        Task DeleteUserAsync(int id);
    }
}