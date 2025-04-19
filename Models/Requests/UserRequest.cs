using System;

namespace IoT.Web.Models.Requests
{
    public abstract class UserRequest
    {
        protected Guid UserId { get; set; }

        public void SetUserId(Guid userId)
        {
            UserId = userId;
        }

        public string GetUserId()
        {
            return UserId.ToString();
        }
    }
}
