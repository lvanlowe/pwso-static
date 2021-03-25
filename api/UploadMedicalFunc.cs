using System;
using System.IO;
using System.Threading.Tasks;
using Azure.Storage.Blobs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Azure.Storage.Blob;
using Microsoft.Extensions.Logging;
using JsonSerializer = System.Text.Json.JsonSerializer;

namespace api
{
    public static class UploadMedicalFunc
    {
        [FunctionName("UploadMedicalFunc")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
            [Blob("forms", Connection = "StorageConnection")] CloudBlobContainer outputContainer,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            await outputContainer.CreateIfNotExistsAsync();
            var requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            var blobName = Guid.NewGuid().ToString();

            var cloudBlockBlob = outputContainer.GetBlockBlobReference(blobName);
                await cloudBlockBlob.UploadTextAsync(requestBody);

            return new OkResult();
        }

        //public static async Task<string> UploadBlobAsync(Stream photoBase64String)
        //{
        //    string fileName = $"{Guid.NewGuid().ToString()}.pdf";
        //    var connectionString = System.Environment.GetEnvironmentVariable("AzureWebJobsStorage");
        //    BlobServiceClient blobServiceClient = new BlobServiceClient(connectionString);
        //    BlobContainerClient containerClient = blobServiceClient.GetBlobContainerClient("forms");
        //    BlobClient blobClient = containerClient.GetBlobClient(fileName);
        //    await blobClient.UploadAsync(photoBase64String, true);

        //    return fileName;
        //}
    }
}
