using System;
using System.Collections.Generic;
using System.Text;

namespace pwsoProcesses.Models
{
    public class AthleteDb
    {
        public string id { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string middleName { get; set; }
        public DateTime birthDate { get; set; }
        public string gender { get; set; }
        public string phone { get; set; }
        public string email { get; set; }
        public string street { get; set; }
        public string city { get; set; }
        public string state { get; set; }
        public string zipCode { get; set; }
        public DateTime medicalDate { get; set; }
        public DateTime medicalExpirationDate { get; set; }
        public string medicalFormId { get; set; }
        public string medicalFormEndDate => medicalExpirationDate.ToShortDateString();
        public List<AthleteParentDb> parentInformation { get; set; }
    }
}
