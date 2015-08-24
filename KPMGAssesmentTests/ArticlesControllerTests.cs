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
using System.Web.Mvc;
using Xunit;

namespace KPMGAssesmentTests
{
    public class ArticlesControllerTests
    {
        private readonly Mock<IArticlesRepository> mockedRep;
        private readonly ArticlesController sut;

        public ArticlesControllerTests()
        {
            mockedRep = new Mock<IArticlesRepository>();
            sut = new ArticlesController(mockedRep.Object);
        }

        [Fact]
        public async void GetAll_ShouldReturn_JsonList()
        {
            // Arrange
            mockedRep.Setup(x => x.GetAllAsync()).ReturnsAsync(new List<Article>());
            
            // Act
            var actual = await sut.GetAll();

            // Assert
            Assert.IsType(typeof(JsonResult<IEnumerable<Article>>), actual);
        }

        [Fact]
        public async void GetOne_ShouldReturn_JsonArticle()
        {
            // Arrange
            mockedRep.Setup(x => x.GetArticleAsync(It.IsAny<int>())).ReturnsAsync(new Article());
            
            // Act
            var actual = await sut.GetOne(0);

            // Assert
            Assert.IsType(typeof(JsonResult<Article>), actual);
        }

        [Fact]
        public async void GetOne_ShouldReturn_NotFound_IfArticleIdIsInvalid()
        {
            // Arrange
            mockedRep.Setup(x => x.GetArticleAsync(It.IsAny<int>())).ReturnsAsync(null);

            // Act
            var result = await sut.GetOne(0);
            var actual = result as StatusCodeResult;

            // Assert
            Assert.NotNull(actual);
            Assert.Equal(HttpStatusCode.NotFound, actual.StatusCode);
        }

        [Fact]
        public async void Post_ShouldReturn_CreatedArticle()
        {
            // Arrange
            mockedRep.Setup(x => x.CreateArticleAsync(It.IsAny<Article>())).ReturnsAsync(new Article());

            // Act
            var actual = await sut.Post(new Article());

            // Assert
            Assert.IsType(typeof(JsonResult<Article>), actual);
        }

        [Fact]
        public async void Post_ShouldReturn_BadRequest_IfExceptionOccurs()
        {
            // Arrange
            mockedRep.Setup(x => x.CreateArticleAsync(It.IsAny<Article>())).ThrowsAsync(new Exception());

            // Act
            var result = await sut.Post(new Article());
            var actual = result as BadRequestErrorMessageResult;

            // Assert
            Assert.NotNull(actual);
        }

        [Fact]
        public async void Put_ShouldReturn_UpdatedArticle()
        {
            // Arrange
            mockedRep.Setup(x => x.UpdateArticleAsync(It.IsAny<int>(), It.IsAny<Article>())).ReturnsAsync(new Article());

            // Act
            var actual = await sut.Put(0, new Article());

            // Assert
            Assert.IsType(typeof(JsonResult<Article>), actual);
        }

        [Fact]
        public async void Put_ShouldReturn_BadRequest_IfExceptionOccurs()
        {
            // Arrange
            mockedRep.Setup(x => x.UpdateArticleAsync(It.IsAny<int>(), It.IsAny<Article>())).ThrowsAsync(new Exception());

            // Act
            var result = await sut.Put(0, new Article());
            var actual = result as BadRequestErrorMessageResult;

            // Assert
            Assert.NotNull(actual);
        }

        [Fact]
        public async void Delete_ShouldReturn_NoContent()
        {
            // Arrange
            mockedRep.Setup(x => x.DeleteArticleAsync(It.IsAny<int>())).Returns(Task.FromResult(0));

            // Act
            var result = await sut.Delete(0);
            var actual = result as StatusCodeResult;

            // Assert
            Assert.NotNull(actual);
            Assert.Equal(HttpStatusCode.NoContent, actual.StatusCode);
        }

        [Fact]
        public async void Delete_ShouldReturn_NotFound_IfArticleIsNotPresent()
        {
            // Arrange
            mockedRep.Setup(x => x.DeleteArticleAsync(It.IsAny<int>())).Throws(new Exception());

            // Act
            var result = await sut.Delete(0);
            var actual = result as StatusCodeResult;

            // Assert
            Assert.NotNull(actual);
            Assert.Equal(HttpStatusCode.NotFound, actual.StatusCode);
        }
    }
}
