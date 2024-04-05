using InAndOutApi.Services;
using InAndOutApi.Models;
using LicensePlateDTO.DTO;
using CollaboratorStoreApi.Models;
using CollaboratorStoreApi.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Data.Common;
using CarStoreApi.Services;
using CarStoreApi.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace InAndOutApi.Controllers;

[ApiController]
[EnableCors("MainPolicy")]
[Route("api/[controller]")]
public class InAndOutController : ControllerBase
{
    private readonly InAndOutService _inandoutService;

    public InAndOutController(InAndOutService inandoutService) =>
        _inandoutService = inandoutService;

    [HttpGet]
    public async Task<List<InAndOut>> Get()
        => await _inandoutService.GetAsync();

    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<InAndOut>> Get(string id)
    {
        var inandout = await _inandoutService.GetAsync(id);

        if (inandout is null)
        {
            return NotFound();
        }

        return inandout;
    }

    [HttpPost]
    public async Task<IActionResult> Post(
        LicensePlateDTO.DTO.LicensePlateDTO DTO,
        [FromServices] CollaboratorsService _collaboratorsService,
        [FromServices] CarsService _carsService
        )
    {
        Car car = new Car();
        Collaborator collaborator = new Collaborator();

        InAndOut newInAndOut = new InAndOut();

        try
        {
            car = await _carsService.GetAsyncWithLicensePlate(DTO.LicensePlate);
        }
        catch (System.Exception)
        {
            if (car == null)
            {
                car.Name = "";
                car.Color = "";
                car.CollaboratorId = "";
                car.LicensePlate = DTO.LicensePlate;
                newInAndOut.In = DateTime.Now;
                newInAndOut.Out = DateTime.MinValue;
                newInAndOut.Status = "Carro não cadastrado";
            }
        }

        try
        {
            collaborator = await _collaboratorsService.GetAsync(car.CollaboratorId);
        }
        catch (System.Exception)
        {

            if (collaborator == null)
            {
                car.Name = "a";
                car.Color = "a";
                car.CollaboratorId = "a";
                car.LicensePlate = DTO.LicensePlate;
                collaborator.EDV = "a";
                collaborator.Name = "a";
                newInAndOut.In = DateTime.Now;
                newInAndOut.Out = DateTime.MinValue;
                newInAndOut.Status = "Carro não cadastrado";

                await _inandoutService.CreateAsync(newInAndOut);
            }
        }

        newInAndOut.Collaborator = collaborator;
        newInAndOut.Car = car;

        if (DTO.In)
        {
            newInAndOut.In = DateTime.Now;
            newInAndOut.Status = "Entrou";
            await _inandoutService.CreateAsync(newInAndOut);

        }

        else if (!DTO.In)
        {
            var LastCar = await _carsService.GetAsyncWithLicensePlate(DTO.LicensePlate);
            var LastInAndOut = await _inandoutService.GetAsyncByCar(LastCar);

            LastInAndOut.Out = DateTime.Now;
            LastInAndOut.Status = "Saiu";

            await _inandoutService.UpdateAsync(LastInAndOut.Id, LastInAndOut);
        }

        return CreatedAtAction(nameof(Get), new { id = newInAndOut.Id }, newInAndOut);
    }

    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> Update(string id, InAndOut updatedInAndOut)
    {
        var inandout = await _inandoutService.GetAsync(id);

        if (inandout is null)
        {
            return NotFound();
        }

        updatedInAndOut.Id = inandout.Id;

        await _inandoutService.UpdateAsync(id, updatedInAndOut);

        return NoContent();
    }
}