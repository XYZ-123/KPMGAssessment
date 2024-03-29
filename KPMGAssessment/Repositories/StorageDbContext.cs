﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KPMGAssessment.Context
{
    using System.Data.Entity;

    using KPMGAssessment.Models;

    public class StorageDbContext : DbContext
    {
        public StorageDbContext() : base("StorageDbContext")
        {
            if(!Database.Exists())
                Database.Initialize(false);
            this.Configuration.ProxyCreationEnabled = false;
        }

        public DbSet<Article> Articles { get; set; }

        public DbSet<User> Users { get; set; }
    }
}