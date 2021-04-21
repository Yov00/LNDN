using System.Collections.Generic;
using Application.Activities;
using Application.Core;
using Application.Interfaces;
using Infrastructure.Security;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using Persistence;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {

        public static IServiceCollection AddApplicationServices(this IServiceCollection services,
            IConfiguration config, string MyAllowSpecificOrigins )
        {
            services.AddCors(options=>{
                            options.AddPolicy(name: MyAllowSpecificOrigins,
                            builder=>{
                                builder
                                    .AllowAnyMethod()
                                    .AllowAnyHeader()
                                    .WithOrigins("http://localhost:3000","http://localhost:3001");
                            });
                        });

            services.AddMediatR(typeof(List.Handler).Assembly);// This tells our application where to go and find our Mediator handlers.
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
            });

            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });
            services.AddScoped<IUserAccessor, UserAccessor>();

            return services;
        }
    }
}