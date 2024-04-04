using Microsoft.Extensions.Options;
using CollaboratorStoreApi.Models;
using CarStoreApi.Models;
using MongoDB.Driver;
using InAndOutApi.Models;
using Amazon.Runtime.SharedInterfaces;

namespace InAndOutApi.Services;

public class InAndOutService
{
    private readonly IMongoCollection<InAndOut> _inandoutCollection;

    public InAndOutService(
        IOptions<BDDatabaseSettings> BDDatabaseSettings)
    {
        var mongoClient = new MongoClient(
            BDDatabaseSettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(
            BDDatabaseSettings.Value.DatabaseName);

        _inandoutCollection = mongoDatabase.GetCollection<InAndOut>(
            BDDatabaseSettings.Value.InAndOutCollectionName);
    }

    public class Teste
    {
        public string? CarId { get; set; }
        public string CarName { get; set; } = null!;
        public string CarColor { get; set; } = null!;
        public string CarLicensePlate { get; set; } = null!;
        public string? CollaboratorId { get; set; }
        public string CollaboratorName { get; set; } = null!;
        public string CollaboratorEDV { get; set; } = null!;
        public string? CollaboratorCarId { get; set; }
        public string? Id { get; set; }
        public DateTime In { get; set; }

        public DateTime Out { get; set; }
    }

    public async Task<List<InAndOut>> GetAsync() =>
        await _inandoutCollection.Find(_ => true).ToListAsync();
    
    public async Task<InAndOut?> GetAsync(string id) =>
        await _inandoutCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    public async Task<InAndOut?> GetAsyncByCar(Car car) =>
        await _inandoutCollection.Find(x => x.Car == car && x.Out.Year < 10).FirstOrDefaultAsync();

    public async Task CreateAsync(InAndOut newBook) =>
        await _inandoutCollection.InsertOneAsync(newBook);

    public async Task UpdateAsync(string id, InAndOut updatedBook) =>
        await _inandoutCollection.ReplaceOneAsync(x => x.Id == id, updatedBook);

    public async Task RemoveAsync(string id) =>
        await _inandoutCollection.DeleteOneAsync(x => x.Id == id);
}