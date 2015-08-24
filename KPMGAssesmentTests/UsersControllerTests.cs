using KPMGAssessment.Controllers;
using KPMGAssessment.Models;
using KPMGAssessment.Repositories;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http.Results;
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
            mockedRep.Setup(x => x.GetAllAsync()).ReturnsAsync(new List<User>());

            // Act
            var actual = await sut.GetAll();

            // Assert
            Assert.IsType(typeof(JsonResult<IEnumerable<User>>), actual);
        }

        [Fact]
        public async void GetOne_ShouldReturn_JsonUser()
        {
            // Arrange
            mockedRep.Setup(x => x.GetUserAsync(It.IsAny<int>())).ReturnsAsync(new User());

            // Act
            var actual = await sut.GetOne(0);

            // Assert
            Assert.IsType(typeof(JsonResult<User>), actual);
        }

        [Fact]
        public async void GetOne_ShouldReturn_NotFound_IfUserIdIsInvalid()
        {
            // Arrange
            mockedRep.Setup(x => x.GetUserAsync(It.IsAny<int>())).ReturnsAsync(null);

            // Act
            var result = await sut.GetOne(0);
            var actual = result as StatusCodeResult;

            // Assert
            Assert.NotNull(actual);
            Assert.Equal(HttpStatusCode.NotFound, actual.StatusCode);
        }

        [Fact]
        public async void Verify_ShouldReturn_User_IfExists()
        {
            // Arrange
            mockedRep.Setup(x => x.FindUserAsync(It.IsAny<User>())).ReturnsAsync(new User { Login = "Test" });

            // Act
            var actual = await sut.Verify(new User());

            // Assert
            Assert.IsType(typeof(JsonResult<User>), actual);
        }

        [Fact]
        public async void Verify_ShouldReturn_NotFound_IfUsersNotExists()
        {
            // Arrange
            mockedRep.Setup(x => x.FindUserAsync(It.IsAny<User>())).ReturnsAsync(null);

            // Act
            var result = await sut.Verify(new User());
            var actual = result as StatusCodeResult;

            // Assert
            Assert.NotNull(actual);
            Assert.Equal(HttpStatusCode.NotFound, actual.StatusCode);
        }

        [Fact]
        public async void Post_ShouldReturn_CreatedUser()
        {
            // Arrange
            mockedRep.Setup(x => x.CreateUserAsync(It.IsAny<User>())).ReturnsAsync(new User());

            // Act
            var actual = await sut.Post(new User());

            // Assert
            Assert.IsType(typeof(JsonResult<User>), actual);
        }

        [Fact]
        public async void Post_ShouldReturn_BadRequest_IfExceptionOccurs()
        {
            // Arrange
            mockedRep.Setup(x => x.CreateUserAsync(It.IsAny<User>())).ThrowsAsync(new Exception());

            // Act
            var result = await sut.Post(new User());
            var actual = result as BadRequestErrorMessageResult;

            // Assert
            Assert.NotNull(actual);
        }

        [Fact]
        public async void Put_ShouldReturn_UpdatedUser()
        {
            // Arrange
            mockedRep.Setup(x => x.UpdateUserAsync(It.IsAny<int>(), It.IsAny<User>())).ReturnsAsync(new User());

            // Act
            var actual = await sut.Put(0, new User());

            // Assert
            Assert.IsType(typeof(JsonResult<User>), actual);
        }

        [Fact]
        public async void Put_ShouldReturn_BadRequest_IfExceptionOccurs()
        {
            // Arrange
            mockedRep.Setup(x => x.UpdateUserAsync(It.IsAny<int>(), It.IsAny<User>())).ThrowsAsync(new Exception());

            // Act
            var result = await sut.Put(0, new User());
            var actual = result as BadRequestErrorMessageResult;

            // Assert
            Assert.NotNull(actual);
        }

        [Fact]
        public async void Delete_ShouldReturn_NoContent()
        {
            // Arrange
            mockedRep.Setup(x => x.DeleteUserAsync(It.IsAny<int>())).Returns(Task.FromResult(0));

            // Act
            var result = await sut.Delete(0);
            var actual = result as StatusCodeResult;

            // Assert
            Assert.NotNull(actual);
            Assert.Equal(HttpStatusCode.NoContent, actual.StatusCode);
        }

        [Fact]
        public async void Delete_ShouldReturn_NotFound_IfUserIsNotPresent()
        {
            // Arrange
            mockedRep.Setup(x => x.DeleteUserAsync(It.IsAny<int>())).Throws(new Exception());

            // Act
            var result = await sut.Delete(0);
            var actual = result as StatusCodeResult;

            // Assert
            Assert.NotNull(actual);
            Assert.Equal(HttpStatusCode.NotFound, actual.StatusCode);
        }
    }
}
