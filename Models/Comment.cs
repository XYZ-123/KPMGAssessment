using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KPMGAssessment.Models
{
    public class Comment
    {
        public int CommendId { get; set; }

        public string Body { get; set; }

        public DateTime Published { get; set; }

        public virtual User Author { get; set; }
    }
}