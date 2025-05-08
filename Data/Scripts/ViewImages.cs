namespace IoT.Web.Data.Scripts
{
    public class ViewImages : IScript
    {
        public string GetScript()
        {
            return @"
                CREATE OR ALTER VIEW ViewImages
                AS  
                    SELECT 
	                    i.Id [ImageId],
	                    i.[ImageGuid],
	                    a.SessionId,
	                    i.ActivityId,
	                    a.[Type] ActivityType,
	                    i.ObjectsJson,
	                    i.CreatedOn
                    FROM [Sessions] s
                    JOIN [Activities] a ON a.SessionId = s.Id
                    JOIN [Images] i ON i.ActivityId = a.Id
                ";
        }
    }
}
