using CollaboratorStoreApi.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace CollaboratorStoreApi.Services;

public class CollaboratorsService
{
    private readonly IMongoCollection<Collaborator> _collaboratorsCollection;

    public CollaboratorsService(
        IOptions<BDDatabaseSettings> BDDatabaseSettings)
    {
        var mongoClient = new MongoClient(
            BDDatabaseSettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(
            BDDatabaseSettings.Value.DatabaseName);

        _collaboratorsCollection = mongoDatabase.GetCollection<Collaborator>(
            BDDatabaseSettings.Value.CollaboratorsCollectionName);
    }

    public async Task<List<Collaborator>> GetAsync() =>
        await _collaboratorsCollection.Find(_ => true).ToListAsync();

    public async Task<Collaborator?> GetAsync(string id) =>
        await _collaboratorsCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(Collaborator newBook) =>
        await _collaboratorsCollection.InsertOneAsync(newBook);

    public async Task UpdateAsync(string id, Collaborator updatedBook) =>
        await _collaboratorsCollection.ReplaceOneAsync(x => x.Id == id, updatedBook);

    public async Task RemoveAsync(string id) =>
        await _collaboratorsCollection.DeleteOneAsync(x => x.Id == id);
}