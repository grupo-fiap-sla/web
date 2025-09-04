import { MOCK_DAILY_CODES, MOCK_HOURLY_CODES, simulateDayTemp, simulateHourTemp } from "./helpers";

// Estrutura de dados - Open Meteo
interface CurrentWeather {
    temperature_2m: number;
    is_day: 0 | 1;
    weather_code: number;
    wind_speed_10m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    precipitation: number;
}

interface HourlyForecast {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
}

interface DailyForecast {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    sunrise: string[];
    sunset: string[];
    uv_index_max: number[];
}

export interface WeatherData {
    current: CurrentWeather;
    hourly: HourlyForecast;
    daily: DailyForecast;
}

// Gerador de Dados Atmosféricos
const generateCurrentData = (): CurrentWeather => {
    // API
    return {
        temperature_2m: 14,
        is_day: 0,
        weather_code: 1,
        wind_speed_10m: 11.2,
        relative_humidity_2m: 82,
        apparent_temperature: 12.5,
        precipitation: 0.0,
    };
};

// Gerador de Dados por Hora
const generateHourlyData = (baseDate: Date): HourlyForecast => {
    const forecast: HourlyForecast = {
        time: [],
        temperature_2m: [],
        weather_code: [],
    };

    for (let hour = 0; hour < 24; hour++) {
        // Data de Previsão
        const forecastDate = new Date(baseDate.getTime() + hour * 60 * 60 * 1000);
        forecast.time.push(forecastDate.toISOString());

        const hourWeatherCode = hour % MOCK_HOURLY_CODES.length;
        const temperature = simulateHourTemp(hour)

        // Dados de Temperatura e Tempo para a Data Prevista
        forecast.temperature_2m.push(temperature);
        forecast.weather_code.push(MOCK_HOURLY_CODES[hourWeatherCode]);
    }

    return forecast;
};

// Gerador de Dados por Semana
const generateDailyData = (baseDate: Date): DailyForecast => {
    const forecast: DailyForecast = {
        time: [],
        weather_code: [],
        temperature_2m_max: [],
        temperature_2m_min: [],
        sunrise: [],
        sunset: [],
        uv_index_max: [],
    };
    
    for (let day = 0; day < 7; day++) {
        const forecastDate = new Date(baseDate.getTime() + day * 24 * 60 * 60 * 1000);
        const dateString = forecastDate.toISOString().split('T')[0]; // Pegar somente a data
        const dayWeatherCode = MOCK_DAILY_CODES[day % MOCK_DAILY_CODES.length]

        forecast.time.push(dateString);
        forecast.weather_code.push(dayWeatherCode);
        
        const [maxTemp, minTemp] = simulateDayTemp(day);
        forecast.temperature_2m_max.push(maxTemp);
        forecast.temperature_2m_min.push(minTemp);
        
        // Horas de Nascer/Pôr do Sol
        forecast.sunrise.push(`${dateString}T06:3${day}`);
        forecast.sunset.push(`${dateString}T18:0${day}`);

        // Índice UV
        const uvIndex = parseFloat((5 + Math.sin(day) * 2).toFixed(1));
        forecast.uv_index_max.push(uvIndex);
    }

    return forecast;
};


// Função para Pegar os Dados
export const getWeatherData = (): WeatherData => {
    const now = new Date(); // Data Atual de Previsão

    return {
        current: generateCurrentData(),
        hourly: generateHourlyData(now),
        daily: generateDailyData(now),
    };
};