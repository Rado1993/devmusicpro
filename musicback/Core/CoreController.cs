using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;

namespace musicback.Core
{
    public class CoreController : ControllerBase
    {
        /// <summary>
        /// Gets or sets the configuration.
        /// </summary>
        /// <value>The configuration.</value>
        private protected IConfiguration Config { get; set; }

        /// <summary>
        /// Processes the filter.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="data">The data.</param>
        /// <returns>CoreFilter&lt;T&gt;.</returns>
        protected CoreFilter<T> ProcessFilter<T>(string data) where T : class
        {
            var opt = new CoreFilter<T>();
            if (data != null)
            {
                var tmp = new CoreRequest() { Data = data };
                opt = tmp.GetObject<CoreFilter<T>>();
            }
            return opt;
        }

        /// <summary>
        /// Gets the configuration.
        /// </summary>
        /// <param name="key">The key.</param>
        /// <returns>System.String.</returns>
        protected string GetConfig(string key)
        {
            var tmp = Environment.GetEnvironmentVariable("musicpro" + key);
            if (string.IsNullOrWhiteSpace(tmp))
            {
                tmp = Config[key];
            }
            return tmp;
        }

    }
}
