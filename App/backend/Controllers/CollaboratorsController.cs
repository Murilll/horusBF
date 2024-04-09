using CollaboratorStoreApi.Models;
using CollaboratorStoreApi.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
 
namespace CollaboratorStoreApi.Controllers;

[ApiController]
[EnableCors("MainPolicy")]
[Route("api/[controller]")]
public class CollaboratorsController : ControllerBase
{
    private readonly CollaboratorsService _collaboratorsService;

    public CollaboratorsController(CollaboratorsService collaboratorsService) =>
        _collaboratorsService = collaboratorsService;

    [HttpGet]
    public async Task<List<Collaborator>> Get() =>
        await _collaboratorsService.GetAsync();

    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<Collaborator>> Get(string id)
    {
        var collaborator = await _collaboratorsService.GetAsync(id);

        if (collaborator is null)
        {
            return NotFound();
        }

        return collaborator;
    }

    [HttpPost]
    public async Task<IActionResult> Post(Collaborator newCollaborator)
    {
        await _collaboratorsService.CreateAsync(newCollaborator);

        return CreatedAtAction(nameof(Get), new { id = newCollaborator.Id }, newCollaborator);
    }

    [HttpPatch("{id:length(24)}")]
    public async Task<IActionResult> Update(string id, Collaborator updatedCollaborator)
    {
        var collaborator = await _collaboratorsService.GetAsync(id);

        if (collaborator is null)
        {
            return NotFound();
        }

        updatedCollaborator.Id = collaborator.Id;

        await _collaboratorsService.UpdateAsync(id, updatedCollaborator);

        return NoContent();
    }

    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
        var collaborator = await _collaboratorsService.GetAsync(id);

        if (collaborator is null)
        {
            return NotFound();
        }

        await _collaboratorsService.RemoveAsync(id);

        return NoContent();
    }
}