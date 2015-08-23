using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace KPMGAssessment.Models
{
    public class Comment
    {
        [Key]
        public int Id { get; set; }

        public string Body { get; set; }

        public DateTime Published { get; set; }

        public int AuthorId { get; set; }

        [ForeignKey("AuthorId")]
        public virtual User Author { get; set; }
    }
}