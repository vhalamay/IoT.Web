using IoT.Web.Exceptions;
using Microsoft.AspNetCore.Http;
using System;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;

namespace IoT.Web.Middlewares
{
    public class ErrorHandlerMiddleware
    {
        private readonly RequestDelegate _next;

        public ErrorHandlerMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception exception)
            {
                var response = context.Response;
                response.ContentType = "application/json";

                switch (exception)
                {
                    case BadRequestException _:
                        {
                            response.StatusCode = (int)HttpStatusCode.BadRequest;
                        }
                        break;
                    case UnauthorizedException _:
                        {
                            response.StatusCode = (int)HttpStatusCode.Unauthorized;
                        }
                        break;
                    case ForbiddenException _:
                        {
                            response.StatusCode = (int)HttpStatusCode.Forbidden;
                        }
                        break;
                    case NotFoundException _:
                        {
                            response.StatusCode = (int)HttpStatusCode.NotFound;
                        }
                        break;
                    default:
                        // unhandled error
                        response.StatusCode = (int)HttpStatusCode.InternalServerError;
                        break;
                }

                var result = JsonSerializer.Serialize(new { message = exception?.Message });

                await response.WriteAsync(result);
            }
        }
    }
}
