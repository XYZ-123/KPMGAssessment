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
            // Act
            // Assert
        }

        [Fact]
        public async void GetOne_ShouldReturn_JsonArticle()
        {
            // Arrange
            // Act
            // Assert
        }

        [Fact]
        public async void GetOne_ShouldReturn_NotFound_IfArticleIdIsInvalid()
        {
            // Arrange
            // Act
            // Assert
        }

        [Fact]
        public async void Post_ShouldReturn_CreatedArticle()
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
        public async void Put_ShouldReturn_UpdatedArticle()
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
        public async void Delete_ShouldReturn_NotFound_IfArticleIsNotPresent()
        {
            // Arrange
            // Act
            // Assert
        }
    }
}
