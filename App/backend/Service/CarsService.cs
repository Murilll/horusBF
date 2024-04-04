using CollaboratorStoreApi.Models;
using CarStoreApi.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace CarStoreApi.Services;

public class CarsService
{
    private readonly IMongoCollection<Car> _carsCollection;

    public CarsService(
        IOptions<BDDatabaseSettings> BDDatabaseSettings)
    {
        var mongoClient = new MongoClient(
            BDDatabaseSettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(
            BDDatabaseSettings.Value.DatabaseName);

        _carsCollection = mongoDatabase.GetCollection<Car>(
            BDDatabaseSettings.Value.CarsCollectionName);
    }

    public async Task<List<Car>> GetAsync() =>
        await _carsCollection.Find(_ => true).ToListAsync();

    public async Task<Car?> GetAsyncWithLicensePlate(string LicensePlate) =>
        await _carsCollection.Find(x => x.LicensePlate == LicensePlate).FirstOrDefaultAsync();
    

    public async Task<Car?> GetAsync(string id) =>
        await _carsCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(Car newBook) =>
        await _carsCollection.InsertOneAsync(newBook);

    public async Task UpdateAsync(string id, Car updatedBook) =>
        await _carsCollection.ReplaceOneAsync(x => x.Id == id, updatedBook);

    public async Task RemoveAsync(string id) =>
        await _carsCollection.DeleteOneAsync(x => x.Id == id);
}