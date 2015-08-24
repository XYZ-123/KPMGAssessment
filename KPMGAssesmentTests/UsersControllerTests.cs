using KPMGAssessment.Controllers;
using KPMGAssessment.Repositories;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace KPMGAssesmentTests
{
    public class UsersControllerTests
    {
        private readonly Mock<IUsersRepository> mockedRep;
        private readonly UsersController sut;

        public UsersControllerTests()
        {
            mockedRep = new Mock<IUsersRepository>();
            sut = new UsersController(mockedRep.Object);
        }

        [Fact]
        public async void GetAll_ShouldReturn_JsonList()
        {
            // Arrange
            // Act
            // Assert
        }

        [Fact]
        public async void GetOne_ShouldReturn_JsonUser()
        {
            // Arrange
            // Act
            // Assert
        }

        [Fact]
        public async void GetOne_ShouldReturn_NotFound_IfUserIdIsInvalid()
        {
            // Arrange
            // Act
            // Assert
        }

        [Fact]
        public async void Verify_ShouldReturn_User_IfExists()
        {
            // Arrange
            // Act
            // Assert
        }

        [Fact]
        public async void Verify_ShouldReturn_NotFound_IfUsersNotExists()
        {
            // Arrange
            // Act
            // Assert
        }

        [Fact]
        public async void Post_ShouldReturn_CreatedUser()
        {
            // Arrange
            // Act
            // Assert
        }

        [Fact]
        public async void Post_ShouldReturn_BadRequest_IfExceptionOccurs()
        {
            // Arrange
            // Act
            // Assert
        }

        [Fact]
        public async void Put_ShouldReturn_UpdatedUser()
        {
            // Arrange
            // Act
            // Assert
        }

        [Fact]
        public async void Put_ShouldReturn_BadRequest_IfExceptionOccurs()
        {
            // Arrange
            // Act
            // Assert
        }

        [Fact]
        public async void Delete_ShouldReturn_NoContent()
        {
            // Arrange
            // Act
            // Assert
        }

        [Fact]
        public async void Delete_ShouldReturn_NotFound_IfUserIsNotPresent()
        {
            // Arrange
            // Act
            // Assert
        }
    }
}
