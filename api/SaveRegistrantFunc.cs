using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace api
{
    public static class SaveRegistrantFunc
    {
        [FunctionName("SaveRegistrantFunc")]
        [return: Queue("registrant", Connection = "StorageConnection")]
        public static string Run([HttpTrigger] dynamic input, ILogger log)
        {
            log.LogInformation($"C# function processed: {input.ToString()}");
            return input.ToString();
        }
    }
}
