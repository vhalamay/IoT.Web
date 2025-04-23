namespace IoT.Web.Data.Scripts
{
    public class ViewDeviceSessionActivityCounts : IScript
    {
        public string GetScript()
        {
            return @"
                CREATE OR ALTER VIEW ViewDeviceSessionActivityCounts
                AS  
	                SELECT 
		                s.DeviceId,
		                CONVERT(DATE, s.[CreatedOn]) AS [Date], 
		                COUNT(DISTINCT s.Id) [Sessions], 
		                COUNT(DISTINCT a.Id) [Activities] 
                    FROM [Sessions] s
	                JOIN [Activities] a ON a.SessionId = s.Id
                    GROUP BY s.DeviceId, CONVERT(DATE, s.[CreatedOn])
            ";
        }
    }
}
