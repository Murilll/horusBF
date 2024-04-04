using CollaboratorStoreApi.Models;
using CollaboratorStoreApi.Services;
using CarStoreApi.Models;
using CarStoreApi.Services;
using InAndOutApi.Services;
using System.Net;
using System.Net.WebSockets;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<BDDatabaseSettings>(
    builder.Configuration.GetSection("BookStoreDatabase"));


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSingleton<CollaboratorsService>();
builder.Services.AddSingleton<CarsService>();
builder.Services.AddSingleton<InAndOutService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "MainPolicy",
        policy =>
        {
            policy
                .AllowAnyHeader()
                .AllowAnyOrigin()
                .AllowAnyMethod();
        });
});


var app = builder.Build();
app.UseCors();
app.UseWebSockets();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Map("/", async context =>
{
    if (!context.WebSockets.IsWebSocketRequest)
        context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
    else
    {
        using var webSocket = await context.WebSockets.AcceptWebSocketAsync();
        while (true)
        {
            await webSocket.SendAsync(
                Encoding.ASCII.GetBytes($".NET Rocks -> {DateTime.Now}"),
                WebSocketMessageType.Text,
                true, CancellationToken.None);
            await Task.Delay(1000);
        }
    }
});
await app.RunAsync();

app.Run();
