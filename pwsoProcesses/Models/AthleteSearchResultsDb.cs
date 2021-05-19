using System;
using System.Collections.Generic;
using System.Text;

namespace pwsoProcesses.Models
{
    public class AthleteSearchResultsDb
    {
        public string id { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string gender { get; set; }
        public DateTime medicalExpirationDate { get; set; }
        public string medicalFormEndDate => medicalExpirationDate.ToShortDateString();

    }
}
