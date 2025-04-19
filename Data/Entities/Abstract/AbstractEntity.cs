using System;
using System.ComponentModel.DataAnnotations;

namespace IoT.Web.Data.Entities.Abstract
{
    public abstract class AbstractEntity
    {
        [Key]
        public long Id { get; set; }
    }
}
