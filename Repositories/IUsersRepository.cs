using System.Collections.Generic;

namespace KPMGAssessment.Repositories
{
    using System.Threading.Tasks;

    using KPMGAssessment.Models;

    public interface IUsersRepository
    {
        Task<User> GetUserAsync(int id);

        Task<IEnumerable<User>> GetAllAsync();

        Task<User> CreateUserAsync(User User);

        Task<User> UpdateUserAsync(int id, User User);

        Task DeleteUserAsync(int id);
    }
}