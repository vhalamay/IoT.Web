namespace IoT.Web.Data.Scripts
{
    public class ViewSessionActivityCounts : IScript
    {
        public string GetScript()
        {
            return @"
                CREATE OR ALTER VIEW ViewSessionActivityCounts
                AS  
                    SELECT 
		                CONVERT(DATE, s.[CreatedOn]) AS [Date], 
		                COUNT(DISTINCT s.Id) [Sessions], 
		                COUNT(DISTINCT a.Id) [Activities] 
                    FROM [Sessions] s
	                JOIN [Activities] a ON a.SessionId = s.Id
                    GROUP BY CONVERT(DATE, s.[CreatedOn])
            ";
        }
    }
}
