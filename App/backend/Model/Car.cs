using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace CarStoreApi.Models;

public class Car
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    public string Name { get; set; } = null!;

    public string Color { get; set; } = null!;

    public string LicensePlate { get; set; } = null!;

    public string CollaboratorId { get; set; } = null!;
}