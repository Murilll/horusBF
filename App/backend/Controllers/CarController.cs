using CarStoreApi.Services;
using CarStoreApi.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace CollaboratorStoreApi.Controllers;

[ApiController]
[EnableCors("MainPolicy")]
[Route("api/[controller]")]
public class CarsController : ControllerBase
{
    private readonly CarsService _carsService;

    public CarsController(CarsService carsService) =>
        _carsService = carsService;

    [HttpGet]
    public async Task<List<Car>> Get() =>
        await _carsService.GetAsync();

    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<Car>> Get(string id)
    {
        var car = await _carsService.GetAsync(id);

        if (car is null)
        {
            return NotFound();
        }

        return car;
    }

    [HttpPost]
    public async Task<IActionResult> Post(Car newCar)
    {
        await _carsService.CreateAsync(newCar);

        return CreatedAtAction(nameof(Get), new { id = newCar.Id }, newCar);
    }

    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> Update(string id, Car updatedCar)
    {
        var car = await _carsService.GetAsync(id);

        if (car is null)
        {
            return NotFound();
        }

        updatedCar.Id = car.Id;

        await _carsService.UpdateAsync(id, updatedCar);

        return NoContent();
    }

    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
        var car = await _carsService.GetAsync(id);

        if (car is null)
        {
            return NotFound();
        }

        await _carsService.RemoveAsync(id);

        return NoContent();
    }
}