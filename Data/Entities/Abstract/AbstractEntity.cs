using System;
using System.ComponentModel.DataAnnotations;

namespace IoT.Web.Data.Entities.Abstract
{
    public abstract class AbstractEntity
    {
        [Key]
        public Guid Id { get; set; }
    }
}
