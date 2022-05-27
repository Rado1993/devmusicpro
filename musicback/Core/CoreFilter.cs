using System.ComponentModel;

namespace musicback.Core
{
    public class CoreFilter<T> where T : class
    {
        /// <summary>
        /// Gets or sets the mode.
        /// </summary>
        /// <value>The mode.</value>
        [DefaultValue(1)]
        public int Mode { get; set; } = 1;

        public int Opc { get; set; } = 0;

        public int Usr { get; set; } = 0;

        public string TBL { get; set; } = null; // mantenedor generico BGU
        /// <summary>
        /// Gets or sets the data.
        /// </summary>
        /// <value>The data.</value>
        public T Data { get; set; }
    }
}
