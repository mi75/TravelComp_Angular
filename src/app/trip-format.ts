export class tripFormat {
  id: number;
  title: string;
  fullTripName: string;
  picName: string;
  picFile: string;
  onMain: number;
  startDate: string;
  finishDate: string;
  price: string;
  characteristics: string;
  program: string;
  features: string;
}

export class tripFormatFeaturesIds extends tripFormat{
  selectedFeatures: string;
}

export class tripFormatAdminTable extends tripFormat{
  showOnMain: string;
}

export class tripFormatFeaturesPics extends tripFormat{
  featuresPics: string;
}
