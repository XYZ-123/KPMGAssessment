using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KPMGAssessment.Models
{
    public class User
    {
        public int UserId { get; set; }

        public string Login { get; set; }

        public UserType UserType { get; set; }
    }
}