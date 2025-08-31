// --- API Data Structure Types ---
// Define clear interfaces for each part of the weather data payload.
// These match the structure of the Open-Meteo API response.

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


// --- Data Generation Logic ---

/**
 * Generates mock data for the current weather conditions.
 * Reflects the current time (evening).
 */
const generateCurrentData = (): CurrentWeather => {
    return {
        temperature_2m: 14,
        is_day: 0, // It's currently past sunset (7 PM)
        weather_code: 1, // Mainly Clear
        wind_speed_10m: 11.2,
        relative_humidity_2m: 82,
        apparent_temperature: 12.5,
        precipitation: 0.0,
    };
};

/**
 * Generates a mock 24-hour forecast starting from a base date.
 * @param baseDate The starting date and time for the forecast.
 * @returns An object containing arrays for the hourly forecast.
 */
const generateHourlyData = (baseDate: Date): HourlyForecast => {
    const forecast: HourlyForecast = {
        time: [],
        temperature_2m: [],
        weather_code: [],
    };

    // An array of weather codes to cycle through for a varied forecast
    const MOCK_HOURLY_CODES = [0, 1, 1, 2, 2, 2, 3, 45, 61, 3, 2, 1, 0, 0, 1, 2, 2, 3, 3, 2, 1, 1, 0, 0];

    for (let hour = 0; hour < 24; hour++) {
        const forecastDate = new Date(baseDate.getTime() + hour * 60 * 60 * 1000);
        forecast.time.push(forecastDate.toISOString());

        // Simulate a plausible temperature curve over 24 hours
        const simulatedTemp = 15 - hour * 0.2 + Math.sin(hour / 2) * 2;
        forecast.temperature_2m.push(Math.round(simulatedTemp));
        
        forecast.weather_code.push(MOCK_HOURLY_CODES[hour % MOCK_HOURLY_CODES.length]);
    }

    return forecast;
};

/**
 * Generates a mock 7-day forecast starting from a base date.
 * @param baseDate The starting date for the forecast.
 * @returns An object containing arrays for the daily forecast.
 */
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
    
    // An array of weather codes to represent the next 7 days
    const MOCK_DAILY_CODES = [3, 80, 61, 1, 0, 2, 95]; // Overcast, Showers, Rain, Clear, Sunny, Cloudy, Thunderstorm

    for (let day = 0; day < 7; day++) {
        const forecastDate = new Date(baseDate.getTime() + day * 24 * 60 * 60 * 1000);
        const dateString = forecastDate.toISOString().split('T')[0];
        
        forecast.time.push(dateString);
        forecast.weather_code.push(MOCK_DAILY_CODES[day % MOCK_DAILY_CODES.length]);
        
        // Simulate plausible daily high and low temperatures
        const maxTemp = 20 + Math.round(Math.sin(day) * 3);
        const minTemp = maxTemp - (8 + Math.round(Math.cos(day) * 2));
        forecast.temperature_2m_max.push(maxTemp);
        forecast.temperature_2m_min.push(minTemp);
        
        // Simulate sunrise/sunset times
        forecast.sunrise.push(`${dateString}T06:3${day}`);
        forecast.sunset.push(`${dateString}T18:0${day}`);

        const uvIndex = parseFloat((5 + Math.sin(day) * 2).toFixed(1));
        forecast.uv_index_max.push(uvIndex);
    }

    return forecast;
};


/**
 * Main function to assemble the complete mock weather data object.
 * This is the function you will call inside your component.
 * @returns A complete WeatherData object.
 */
export const getMockData = (): WeatherData => {
    const now = new Date(); // Use the current date as the basis for the forecast

    return {
        current: generateCurrentData(),
        hourly: generateHourlyData(now),
        daily: generateDailyData(now),
    };
};