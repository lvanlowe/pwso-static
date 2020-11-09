using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Azure.Cosmos.Table;
using Microsoft.Extensions.Logging;
//using Microsoft.WindowsAzure.Storage.Table;
using Newtonsoft.Json;
using TableAttribute = Microsoft.Azure.WebJobs.TableAttribute;

namespace api
{
    public static class GetSportFunc
    {
        [FunctionName("GetSportFunc")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req,
            [Table("Sport", "Sports", Connection = "StorageConnection")] CloudTable table,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");
            string filter = TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, "Sports");

            TableQuery<Sports> tableQuery = new TableQuery<Sports>().Where(filter);

            var result = table.ExecuteQuery(tableQuery);

            return new OkObjectResult(result);
        }

        public class Sports : TableEntity
        {
            public long id { get; set; }
            public bool isTeamSport { get; set; }
            public bool canRegister { get; set; }
            public bool hasUniform { get; set; }
            public string email { get; set; }
            public string name { get; set; }
        }
    }
}
