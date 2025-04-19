using IoT.Web.Models.Requests;

namespace IoT.Web.Extensions
{
    public static class PagingExtensions
    {
        public static int Take = 10;

        public static int GetSkip(this IPagingRequest request, int? count)
        {
            if (!count.HasValue)
                return 0;

            var skip = ((request.Page ?? 1) - 1) * Take;

            if(skip >= count)
                skip = 0;

            return skip;
        }
    }
}
