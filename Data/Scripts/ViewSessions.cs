namespace IoT.Web.Data.Scripts
{
    public class ViewSessions : IScript
    {
        public string GetScript()
        {
            return @"
                CREATE OR ALTER VIEW ViewSessions
                AS  
                    SELECT 
	                    s.[Id],
                        s.[DeviceId],
	                    d.[Name] [Device],
	                    s.[CreatedOn],
	                    s.[UpdatedOn],
	                    COUNT(*) [Activities]
                    FROM [Sessions] s
                    JOIN [Devices] d ON d.Id = s.[DeviceId]
                    LEFT JOIN Activities a ON a.SessionId = s.Id
                    GROUP BY s.[Id], s.[DeviceId], d.[Name], s.[CreatedOn], s.[UpdatedOn]
            ";
        }
    }
}
