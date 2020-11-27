using System;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
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

    public class AthleteDb
    { 
        public string id { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string middleName { get; set; }
        public DateTime birthDate { get; set; }
        public string gender { get; set; }
        public string phone { get; set; }
        public string email { get; set; }
        public string street { get; set; }
        public string city { get; set; }
        public string state { get; set; }
        public string zipCode { get; set; }
        public string parentName { get; set; }
        public string relationship { get; set; }
        public string parentStreet { get; set; }
        public string parentCity { get; set; }
        public string parentState { get; set; }
        public string parentZipCode { get; set; }
        public string parentPhone { get; set; }
        public string parentEmail { get; set; }
        public DateTime medicalDate { get; set; }
        public DateTime medicalExpirationDate { get; set; }
        public string medicalFormId { get; set; }
    }
}
