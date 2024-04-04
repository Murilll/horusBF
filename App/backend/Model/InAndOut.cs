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

    public Collaborator Collaborator { get; set; } = null!;

    public Car Car { get; set; } = null!;

    public DateTime In { get; set; }
    
    public DateTime Out { get; set; }

    public string Status { get; set; }
}