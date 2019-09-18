export class PIMenu {

  constructor(
    public guid: string,
    public first_nameV: boolean,
    public middle_nameV: boolean,
    public last_nameV: boolean,
    public emailV: boolean,
    public phoneV: boolean,
    public zipcodeV: boolean,
    public codeOTheDayV: boolean,
    public socialMediaURLV: boolean,
		public socialSecurityNumberV: boolean,
		public driversLicenseV: boolean,
		public passportNumberV: boolean,
		public passportNationV: boolean,
		public ageV: boolean,
		public otherNamesUsedInThePastV: boolean,
    // pii

    public dxV: boolean,
    public rxV: boolean,
    public bloodGrpV: boolean,
    public inTheKnowV: boolean,
    public compliantPatientV: boolean,
    public governmentFoodSubsistenceV: boolean,
    // phi

    public nonPciAcctV: boolean,
    public nonPciSecDigitzV: boolean,
    // pci
    // endValues

		public first_nameL: boolean,
    public middle_nameL: boolean,
    public last_nameL: boolean,
    public emailL: boolean,
    public phoneL: boolean,
    public zipcodeL: boolean,
    public codeOTheDayL: boolean,
    public socialMediaURLL: boolean,
		public socialSecurityNumberL: boolean,
		public driversLicenseL: boolean,
		public passportNumberL: boolean,
		public passportNationL: boolean,
		public ageL: boolean,
		public otherNamesUsedInThePastL: boolean,
    // pii

    public dxL: boolean,
    public rxL: boolean,
    public bloodGrpL: boolean,
    public inTheKnowL: boolean,
    public compliantPatientL: boolean,
    public governmentFoodSubsistenceL: boolean,
    // phi

    public nonPciAcctL: boolean,
    public nonPciSecDigitzL: boolean
    // pci
    // endLabels
  ) {  }

}
