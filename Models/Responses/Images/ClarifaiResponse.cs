using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace IoT.Web.Models.Responses.Images
{
    public class ClarifaiResponse
    {
        [JsonPropertyName("status")]
        public Status Status { get; set; }

        [JsonPropertyName("outputs")]
        public List<Output> Outputs { get; set; }
    }

    public class Status
    {
        [JsonPropertyName("code")]
        public int Code { get; set; }

        [JsonPropertyName("description")]
        public string Description { get; set; }

        [JsonPropertyName("req_id")]
        public string ReqId { get; set; }
    }

    public class Output
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }

        [JsonPropertyName("status")]
        public Status Status { get; set; }

        [JsonPropertyName("created_at")]
        public DateTime CreatedAt { get; set; }

        [JsonPropertyName("model")]
        public Model Model { get; set; }

        [JsonPropertyName("input")]
        public Input Input { get; set; }

        [JsonPropertyName("data")]
        public OutputData Data { get; set; }
    }

    public class Model
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("created_at")]
        public DateTime CreatedAt { get; set; }

        [JsonPropertyName("modified_at")]
        public DateTime ModifiedAt { get; set; }

        [JsonPropertyName("app_id")]
        public string AppId { get; set; }

        [JsonPropertyName("model_version")]
        public ModelVersion ModelVersion { get; set; }

        [JsonPropertyName("user_id")]
        public string UserId { get; set; }

        [JsonPropertyName("model_type_id")]
        public string ModelTypeId { get; set; }

        [JsonPropertyName("visibility")]
        public Visibility Visibility { get; set; }

        [JsonPropertyName("toolkits")]
        public List<object> Toolkits { get; set; }

        [JsonPropertyName("use_cases")]
        public List<object> UseCases { get; set; }

        [JsonPropertyName("languages")]
        public List<object> Languages { get; set; }

        [JsonPropertyName("languages_full")]
        public List<object> LanguagesFull { get; set; }

        [JsonPropertyName("check_consents")]
        public List<object> CheckConsents { get; set; }

        [JsonPropertyName("workflow_recommended")]
        public bool WorkflowRecommended { get; set; }

        [JsonPropertyName("image")]
        public ModelImage Image { get; set; }

        [JsonPropertyName("billing_type")]
        public int BillingType { get; set; }
    }

    public class ModelVersion
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }

        [JsonPropertyName("created_at")]
        public DateTime CreatedAt { get; set; }

        [JsonPropertyName("status")]
        public Status Status { get; set; }

        [JsonPropertyName("visibility")]
        public Visibility Visibility { get; set; }

        [JsonPropertyName("app_id")]
        public string AppId { get; set; }

        [JsonPropertyName("user_id")]
        public string UserId { get; set; }

        [JsonPropertyName("metadata")]
        public Dictionary<string, object> Metadata { get; set; }
    }

    public class Visibility
    {
        [JsonPropertyName("gettable")]
        public int Gettable { get; set; }
    }

    public class ModelImage
    {
        [JsonPropertyName("url")]
        public string Url { get; set; }

        [JsonPropertyName("hosted")]
        public Hosted Hosted { get; set; }
    }

    public class Hosted
    {
        [JsonPropertyName("prefix")]
        public string Prefix { get; set; }

        [JsonPropertyName("suffix")]
        public string Suffix { get; set; }

        [JsonPropertyName("sizes")]
        public List<string> Sizes { get; set; }

        [JsonPropertyName("crossorigin")]
        public string Crossorigin { get; set; }
    }

    public class Input
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }

        [JsonPropertyName("data")]
        public InputData Data { get; set; }
    }

    public class InputData
    {
        [JsonPropertyName("image")]
        public InputImage Image { get; set; }
    }

    public class InputImage
    {
        [JsonPropertyName("url")]
        public string Url { get; set; }

        [JsonPropertyName("base64")]
        public string Base64 { get; set; }
    }

    public class OutputData
    {
        [JsonPropertyName("concepts")]
        public List<Concept> Concepts { get; set; }
    }

    public class Concept
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("value")]
        public float Value { get; set; }

        [JsonPropertyName("app_id")]
        public string AppId { get; set; }

        [JsonPropertyName("user_id")]
        public string UserId { get; set; }
    }
}
