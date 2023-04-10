import { DateTime } from "luxon";

const API_KEY = 'b295a3ff018fa303fc96955942128d9f';
const BASE_URL = 'https://api.openweathermap.org/data/2.5'


const getWeatherData = (infoType, searchParams) => {
    const url = new URL(BASE_URL + "/" + infoType);
    url.search = new URLSearchParams({ ...searchParams, appid:API_KEY});

    return fetch(url).then((res) => res.json());
};

const formatCurrentWeather = (data, timezone = "UTC") => {
    const {
        coord: { lat, lon },
        main: { temp, feels_like, temp_min, temp_max, humidity },
        name,
        dt,
        sys: { country, sunrise, sunset },
        weather,
        wind: { speed },
    } = data;

    const { main: details, icon } = weather[0];

    const localTime = formatToLocalTime(dt, timezone);

    return {
        lat,
        lon,
        temp,
        feels_like,
        temp_min,
        temp_max,
        humidity,
        name,
        dt,
        country,
        sunrise,
        sunset,
        details,
        icon,
        speed,
        localTime,
    };
};

const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData(
        "weather",
        searchParams
    ).then(formatCurrentWeather);

    const { lat, lon } = formattedCurrentWeather;


    const formattedForecastWeather = await getThreeHourlyForecast({
        lat,
        lon,
        units: searchParams.units,
    });

    const forecast = Array.isArray(formattedForecastWeather) ? formattedForecastWeather.map((weatherData) => {
        const {
            dt,
            main: { temp, temp_min, temp_max },
            weather,
            wind: { speed },
        } = weatherData;

        const { icon } = weather[0];

        const localTime = formatToLocalTime(dt, formattedForecastWeather.city.timezone);

        return {
            dt,
            temp,
            temp_min,
            temp_max,
            icon,
            speed,
            localTime,
        };
    }): [];

    return {...formattedCurrentWeather, forecast};
};

const getThreeHourlyForecast = async (searchParams) => {
    const formattedForecastWeather = await getWeatherData("forecast", {
        ...searchParams,
        units: searchParams.units,
    });

    return formattedForecastWeather;
};

const formatToLocalTime = (
    secs,
    zone,
    format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code) =>
    `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;


export { formatToLocalTime, iconUrlFromCode };





