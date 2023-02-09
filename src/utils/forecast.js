const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${process.env.FORECAST_ACCESS_KEY}&query=${latitude},${longitude}&units=m`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service.", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions}. It is current ${body.current.temperature} degress out. It feels like ${body.current.feelslike} degress out. The humidity is ${body.current.humidity}%. UV index ${body.current.uv_index}`
      );
    }
  });
};

module.exports = forecast;
