using KPMGAssessment.Context;
using KPMGAssessment.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace KPMGAssessment.Repositories
{
    public class UsersRepository : IUsersRepository
    {
        public async Task<User> GetUserAsync(int id)
        {
            User user;

            using (var context = new StorageDbContext())
            {
                user = await context.Users.FindAsync(id);
            }

            return user;
        }

        public async Task<IEnumerable<User>> GetAllAsync()
        {
            using (var context = new StorageDbContext())
            {
                return context.Users.ToList();
            }
        }

        public async Task<User> CreateUserAsync(User User)
        {
            User savedUser;

            using (var context = new StorageDbContext())
            {
                savedUser = context.Users.Add(User);
                await context.SaveChangesAsync();
            }

            return savedUser;
        }

        public async Task<User> UpdateUserAsync(int id, User User)
        {
            using (var context = new StorageDbContext())
            {
                var userToUpdate = await context.Users.FindAsync(id);
                MergeUsers(userToUpdate, User);
                await context.SaveChangesAsync();
            }
            return User;
        }

        public async Task DeleteUserAsync(int id)
        {
            using (var context = new StorageDbContext())
            {
                var userToRemove = await context.Users.FindAsync(id);
                context.Users.Remove(userToRemove);
                await context.SaveChangesAsync();
            }
        }

        private void MergeUsers(User UserToUpdate, User User)
        {
            UserToUpdate.UserType = User.UserType;
        }
    }
}