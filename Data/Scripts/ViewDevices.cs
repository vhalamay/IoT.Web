namespace IoT.Web.Data.Scripts
{
    public class ViewDevices : IScript
    {
        public string GetScript()
        {
            return @"
                CREATE OR ALTER VIEW ViewDevices
                AS  
                    SELECT 
	                    d.[Id], 
	                    [Name], 
	                    [Active],
	                    COUNT(DISTINCT s.Id) [Sessions]
                    FROM [Devices] d
                    LEFT JOIN [Sessions] s ON s.DeviceId = d.[Id]
                    WHERE d.[Deleted] = 0
                    GROUP BY d.[Id], [Name], [Active] 
            ";
        }
    }
}
