using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KPMGAssessment.Models
{
    public class Article
    {
        public int ArticleId { get; set; }

        public string Title { get; set; }

        public string Body { get; set; }

        public DateTime DatePublished { get; set; }

        public long Likes { get; set; }

        public DateTime LastEdited { get; set; }

        public virtual User Author { get; set; }

        public virtual List<Comment> Comments { get; set; }
    }
}