export interface IResponse<T> {
  config: any,
  data: T,
  headers: any,
  request: XMLHttpRequest,
  status: number,
  statusText: string
}

export interface ICoord {
  lat: number,
  lon: number
}

export interface IRequestWeather extends ICoord{
  units?: 'standard' | 'metric' | 'imperial',
}

export interface IMainWeather {
  'temp': number,
  'feels_like': number,
  'temp_min': number,
  'temp_max': number,
  'pressure': number,
  'humidity': number,
  'sea_level': number,
  'grnd_level': number
}
export interface IWeather {
  'id': number,
  'main': string,
  'description': string,
  'icon': string
}
export interface IWind {
  'speed': number,
  'deg': number,
  'gust': number
}

export interface IResponseWeather {
  coord: ICoord,
  weather: IWeather[],
  main: IMainWeather,
  'base': string,
  visibility: number,
  wind: IWind,
  'clouds': {
    'all': number
  },
  'dt': number,
  'sys': {
    'type': number,
    'id': number,
    'country': string,
    'sunrise': number,
    'sunset': number
  },
  'timezone': number,
  'id': number,
  'name': string,
  'cod': number
}