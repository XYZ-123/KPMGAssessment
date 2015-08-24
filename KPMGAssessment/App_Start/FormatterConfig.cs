using System.Web;
using System.Web.Mvc;

namespace KPMGAssessment
{
    using System.Web.Http;

    using Newtonsoft.Json;

    public class FormatterConfig
    {
        public static void RegisterFormatters(HttpConfiguration config)
        {
            var jsonFormatter = config.Formatters.JsonFormatter;
            config.Formatters.Clear();

            jsonFormatter.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
            config.Formatters.Add(jsonFormatter);
        }
    }
}