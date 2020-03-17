import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { useInterval } from '../../hooks/useInterval'
import { usePosition } from '../../hooks/usePosition'

import * as api from '../../api/api.weather'
import { isMobile } from '../../utils/device'

const WeatherIndicator = ({ delayMins }) => {
  const [weather, setWeather] = useState({})
  const { latitude, longitude, timestamp } = usePosition(isMobile)

  useInterval(() => {
    api
      .getWeatherDataByCoords(latitude, longitude)
      .then(({ description, temperature, iconCode }) => {
        setWeather({ description, temperature, iconCode, timestamp })
      })
      .catch(e => console.log(e))
  }, delayMins * 60 * 1000)

  useEffect(() => {
    if (latitude && longitude) {
      api
        .getWeatherDataByCoords(latitude, longitude)
        .then(({ description, temperature, iconCode }) => {
          setWeather({
            description,
            temperature,
            iconCode,
            timestamp: new Date().getTime()
          })
        })
        .catch(e => console.log(e))
    }
  }, [latitude, longitude, timestamp])

  console.log('render weather', { ...weather })
  return (
    <ul className='weather-container'>
      {weather && (
        <li>
          <i className={`fas fa-${weather.iconCode} weather-icon`} />
        </li>
      )}
    </ul>
  )
}

WeatherIndicator.defaultProps = {
  delayMins: 1
}

WeatherIndicator.propTypes = {
  delayMins: PropTypes.number.isRequired,
  watch: PropTypes.bool,
  settings: PropTypes.object
}

export default WeatherIndicator
