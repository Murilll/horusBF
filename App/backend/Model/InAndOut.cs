using CarStoreApi.Models;
using CollaboratorStoreApi.Models;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace InAndOutApi.Models;

public class InAndOut
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    public Collaborator Collaborator { get; set; }

    public Car Car { get; set; }

    public DateTimeOffset In { get; set; }
    
    public DateTimeOffset Out { get; set; }

    public string Status { get; set; }

    public string LicensePlateUnknown { get; set; }
}