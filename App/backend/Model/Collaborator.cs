using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace CollaboratorStoreApi.Models;

public class Collaborator
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    public string Name { get; set; } = null!;

    public string EDV { get; set; } = null!;
}