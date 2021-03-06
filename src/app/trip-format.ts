export class tripFormat {
  id: number;
  title: string;
  fullTripName: string;
  picName: string;
  picFile: string;
  onCommon: number;
  onSlider: number;
  onPopular: number;
  startDate: string;
  finishDate: string;
  price: string;
  characteristics: string;
  notInclude: string;
  program: string;
  features: string;
}

export class tripFormatFeaturesIds extends tripFormat{
  selectedFeatures: string;
}

export class tripFormatFeaturesPics extends tripFormat{
  featuresPics: string;
}
