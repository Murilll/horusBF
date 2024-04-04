namespace CollaboratorStoreApi.Models;

public class BDDatabaseSettings
{
    public string ConnectionString { get; set; } = null!;

    public string DatabaseName { get; set; } = null!;

    public string CollaboratorsCollectionName { get; set; } = null!;

    public string CarsCollectionName { get; set; } = null!;

    public string InAndOutCollectionName { get; set; } = null!;
}