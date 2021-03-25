using System;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using pwsoProcesses.Models;
using JsonSerializer = System.Text.Json.JsonSerializer;

namespace api
{
    public static class SaveAthleteFunc
    {
        [FunctionName("SaveAthleteFunc")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
            [CosmosDB(
                databaseName: "pwso",
                collectionName: "athlete",
                ConnectionStringSetting = "CosmosDBConnection")]IAsyncCollector<AthleteDb> athleteDocuments,

            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");
            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true,
            };
            var requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            var athleteDb = JsonSerializer.Deserialize<AthleteDb>(requestBody, options);
            try
            {
                athleteDb.id = Guid.NewGuid().ToString();
                await athleteDocuments.AddAsync(athleteDb);
            }
            catch (Exception e)
            {
                log.LogInformation(e.ToString());
            }

            return new OkObjectResult(athleteDb);
        }
    }

}
