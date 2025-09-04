'use client';

import { useState, useEffect } from 'react';
import { WEATHER_CODES, WeatherIcon } from './weather-icon';
import { getWeatherData, WeatherData } from './mockdata';
import { InfoCard } from './infocard';

export default function WeatherCheck() {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [location, setLocation] = useState<{
        latitude: number;
        longitude: number;
    } | null>(null);

    const [locationName, setLocationName] = useState<string>(
        'Buscando sua localização...',
    );

    // Geolocalização do usuário na montagem do componente
    useEffect(() => {
        if (!navigator.geolocation) {
            setError('A geolocalização não é suportada pelo seu navegador.');
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            () => {
                setError(
                    'Não foi possível obter a localização. Verifique as permissões do seu navegador.',
                );
                setLoading(false);
            },
        );
    }, []); // Executa apenas na primeira montagem

    // Dados do tempo e nome da localização
    useEffect(() => {
        if (!location) return;

        const fetchWeatherDataAndLocation = async () => {
            setLoading(true);
            setError(null);

            try {
                // --- Busca o nome da localização ---
                const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${location.latitude}&longitude=${location.longitude}&localityLanguage=pt`;
                const geoResponse = await fetch(geoApiUrl);
                if (!geoResponse.ok)
                    throw new Error('Falha ao buscar o nome da cidade.');

                const geoData = await geoResponse.json();

                setLocationName(
                    geoData.city
                        ? `${geoData.city}, ${geoData.principalSubdivision}`
                        : 'Localização Desconhecida',
                );

                // --- Busca os dados do tempo (usando mock por enquanto) ---
                const mockData = getWeatherData();
                setWeatherData(mockData);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Ocorreu um erro inesperado.');
                }
                console.error('Erro ao buscar dados: ', err);
            } finally {
                setLoading(false);
            }
        };

        fetchWeatherDataAndLocation();
    }, [location]); // Executa sempre que o estado da localização mudar

    if (loading) {
        return (
            <div className="h-screen bg-gray-900 flex items-center justify-center text-white">
                {locationName}
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-screen bg-gray-900 flex items-center justify-center text-red-400">
                Erro: {error}
            </div>
        );
    }

    if (!weatherData) return null;

    const { current, hourly, daily } = weatherData;

    return (
        <div className="h-screen bg-gradient-to-br from-emerald-900 via-zinc-900 to-black text-white font-sans overflow-y-auto">
            <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
                {/* --- Exibição Principal do Tempo Atual --- */}
                <section className="text-center">
                    <h1 className="text-2xl sm:text-3xl font-bold">
                        {locationName}
                    </h1>
                    <p className="text-gray-300 text-lg">
                        {new Date().toLocaleDateString('pt-BR', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </p>
                    <div className="mt-4 flex flex-col items-center">
                        <div className="text-7xl sm:text-8xl font-thin flex items-start">
                            {Math.round(current.temperature_2m)}
                            <span className="text-4xl sm:text-5xl font-medium mt-2">
                                °C
                            </span>
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                            <WeatherIcon
                                code={current.weather_code}
                                isDay={current.is_day}
                                className="w-8 h-8"
                            />
                            <p className="text-xl text-blue-200">
                                {WEATHER_CODES[current.weather_code]}
                            </p>
                        </div>
                        <p className="text-lg text-gray-300 mt-1">
                            Máx: {Math.round(daily.temperature_2m_max[0])}° Mín:{' '}
                            {Math.round(daily.temperature_2m_min[0])}°
                        </p>
                    </div>
                </section>

                {/* --- Previsão por Hora --- */}
                <section className="bg-black/20 backdrop-blur-md p-4 rounded-2xl">
                    <h2 className="text-sm text-gray-400 uppercase font-bold mb-3 border-b border-white/20 pb-2">
                        Previsão por Hora
                    </h2>

                    <div className="flex overflow-x-auto space-x-6 pb-2">
                        {hourly.time
                            .slice(0, 24)
                            .map((time: string, index: number) => (
                                <div
                                    key={time}
                                    className="flex flex-col items-center space-y-2 flex-shrink-0"
                                >
                                    <p className="text-sm text-gray-300">
                                        {new Date(time).getHours()}:00
                                    </p>
                                    <WeatherIcon
                                        code={hourly.weather_code[index]}
                                        isDay={current.is_day}
                                        className="w-8 h-8"
                                    />
                                    <p className="text-lg font-bold">
                                        {Math.round(
                                            hourly.temperature_2m[index],
                                        )}
                                        °
                                    </p>
                                </div>
                            ))}
                    </div>
                </section>

                {/* --- Previsão para 7 Dias --- */}
                <section className="bg-black/20 backdrop-blur-md p-4 rounded-2xl">
                    <h2 className="text-sm text-gray-400 uppercase font-bold mb-3 border-b border-white/20 pb-2">
                        Previsão para 7 Dias
                    </h2>
                    <div className="space-y-2">
                        {daily.time.map((day: string, index: number) => (
                            <div
                                key={day}
                                className="grid grid-cols-3 sm:grid-cols-4 items-center gap-4 py-1"
                            >
                                <p className="font-medium col-span-1 sm:col-span-1 capitalize">
                                    {new Date(
                                        day + 'T00:00:00',
                                    ).toLocaleDateString('pt-BR', {
                                        weekday: 'long',
                                    })}
                                </p>
                                <div className="flex justify-center">
                                    <WeatherIcon
                                        code={daily.weather_code[index]}
                                        isDay={true}
                                        className="w-7 h-7"
                                    />
                                </div>
                                <div className="col-span-1 sm:col-span-2 flex justify-end items-center space-x-4">
                                    <p className="font-medium">
                                        {Math.round(
                                            daily.temperature_2m_min[index],
                                        )}
                                        °
                                    </p>
                                    <div className="w-24 h-1.5 bg-gray-600 rounded-full">
                                        <div
                                            className="h-1.5 bg-gradient-to-r from-cyan-400 to-yellow-400 rounded-full"
                                            style={{ width: '100%' }}
                                        ></div>
                                    </div>
                                    <p className="font-medium">
                                        {Math.round(
                                            daily.temperature_2m_max[index],
                                        )}
                                        °
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- Grade de Detalhes do Tempo --- */}
                <section>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <InfoCard
                            title="Sensação Térmica"
                            value={`${Math.round(current.apparent_temperature)}°`}
                            icon={
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
                                </svg>
                            }
                        />
                        <InfoCard
                            title="Umidade"
                            value={`${current.relative_humidity_2m}%`}
                            icon={
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
                                </svg>
                            }
                        />
                        <InfoCard
                            title="Velocidade do Vento"
                            value={`${current.wind_speed_10m} km/h`}
                            icon={
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M17.7 7.7a2.5 2.5 0 1 1-3.2 4.2A2.5 2.5 0 0 1 17.7 7.7z" />
                                    <path d="M6.3 16.3a2.5 2.5 0 1 1-3.2 4.2A2.5 2.5 0 0 1 6.3 16.3z" />
                                    <path d="M12 12h8.5" />
                                    <path d="M3.5 12H8" />
                                    <path d="M12 5.5V12" />
                                    <path d="M12 12v6.5" />
                                </svg>
                            }
                        />
                        <InfoCard
                            title="Índice UV"
                            value={daily.uv_index_max[0]}
                            icon={
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M12 12:12 21M4.22 4.22l1.42 1.42M1 12h2M21 12h2M18.36 18.36l1.42 1.42M18.36 5.64l1.42-1.42M5.64 18.36l-1.42 1.42" />
                                </svg>
                            }
                        />
                        <InfoCard
                            title="Nascer do Sol"
                            value={new Date(
                                daily.sunrise[0],
                            ).toLocaleTimeString('pt-BR', {
                                hour: '2-digit',
                                minute: '2-digit',
                            })}
                            icon={
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M12 2L12 8" />
                                    <path d="M5.2 6.4L7 8" />
                                    <path d="M2 14h20" />
                                    <path d="M17 8l1.8 1.6" />
                                    <path d="M12 22a8 8 0 008-8" />
                                </svg>
                            }
                        />
                        <InfoCard
                            title="Pôr do Sol"
                            value={new Date(daily.sunset[0]).toLocaleTimeString(
                                'pt-BR',
                                { hour: '2-digit', minute: '2-digit' },
                            )}
                            icon={
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M12 8L12 2" />
                                    <path d="M17 8l1.8-1.6" />
                                    <path d="M2 14h20" />
                                    <path d="M5.2 6.4L7 8" />
                                    <path d="M12 22a8 8 0 01-8-8" />
                                </svg>
                            }
                        />
                    </div>
                </section>
            </main>
        </div>
    );
}
