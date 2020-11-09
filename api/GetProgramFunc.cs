using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Azure.Cosmos.Table;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace api
{
    public static class GetProgramFunc
    {
        [FunctionName("GetProgramFunc")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req,
            [Table("Sport", "Programs", Connection = "StorageConnection")] CloudTable table,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");
            string filter = TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, "Programs");

            TableQuery<Programs> tableQuery = new TableQuery<Programs>().Where(filter);

            //TableQuery<Programs> rangeQuery = new TableQuery<Programs>();

            var result = table.ExecuteQuery(tableQuery);

            //var sports = table.ExecuteQuery(r/*/*a*/*/ngeQuery, null);
            return new OkObjectResult(result);
        }

        public class Programs : TableEntity
        {
            public long id { get; set; }
            public string name { get; set; }
            public int sportid { get; set; }
            public int year { get; set; }
            public bool isWaitlist { get; set; }
            public string sportName { get; set; }

        }
    }
}
