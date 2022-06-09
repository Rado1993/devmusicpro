using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Oracle.ManagedDataAccess.Client;
using Serviexpress.Repositories;
using System;


namespace Serviexpress
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddTransient<IEmpleadoRepositorie, EmpleadoRepositorie>();
            services.AddSingleton<IConfiguration>(Configuration);
            services.AddMvc();


            services.AddControllersWithViews();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }else{
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            //app.UseMvc();

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();


            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });

            /*app.Run(async (context) =>
            {
                //await context.Response.WriteAsync("Hello World");

                string connString = "User Id=SERVIEXPRESS;Password=PORTAFOLIO;Data Source=localhost:1521/xe";

                using OracleConnection conn = new OracleConnection(connString);

                using OracleCommand cmd = conn.CreateCommand();

                try
                {
                    conn.Open();
                    cmd.BindByName = true;

                    cmd.CommandText = "Select NOM_EMPLEADO from EMPLEADO WHERE ID_USUARIO=1";

                    OracleDataReader reader = cmd.ExecuteReader();


                    while (reader.Read())
                    {
                        await context.Response.WriteAsync("Nombre primer empleado: " + reader.GetString(0));
                    }

                    reader.Dispose();
                }
                catch (System.Exception ex)
                {
                    await context.Response.WriteAsync(ex.Message);

                    throw;
                }

            });*/



            
            
        }
    }
}
