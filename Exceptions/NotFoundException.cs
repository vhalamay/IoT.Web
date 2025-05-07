using System;

namespace IoT.Web.Exceptions
{
    public class NotFoundException : Exception
    {
        public NotFoundException(string message)
            : base(message) { }
        public NotFoundException(string entity, Guid id) 
            : base($"Not Found: {entity} ({id})") { }

        public NotFoundException(string entity, string column, Guid id)
            : base($"Not Found: {entity} ({column}={id})") { }
    }
}
