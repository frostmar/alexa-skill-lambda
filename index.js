/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core')
const smartthings = require('./smartthings.js')

const GetTemperatureHandler = {
  canHandle (handlerInput) {
    const request = handlerInput.requestEnvelope.request
    return request.type === 'LaunchRequest' ||
      (request.type === 'IntentRequest' &&
        request.intent.name === 'GetTemperatureIntent')
  },
  async handle (handlerInput) {
    const { temp, humidity } = await smartthings.getTemperatureAndHumidity()
    const speechOutput = `The indoor temperature is ${temp} degrees`

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .withSimpleCard('Temperature', `Indoor temperature ${temp}°C, humidity ${humidity}%`)
      .getResponse()
  }
}

const GetHumidityHandler = {
  canHandle (handlerInput) {
    const request = handlerInput.requestEnvelope.request
    return request.type === 'LaunchRequest' ||
      (request.type === 'IntentRequest' &&
        request.intent.name === 'GetHumidityIntent')
  },
  async handle (handlerInput) {
    const { temp, humidity } = await smartthings.getTemperatureAndHumidity()
    const speechOutput = `The indoor humidity is ${humidity} percent`

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .withSimpleCard('Humidity', `Indoor temperature ${temp}°C, humidity ${humidity}%`)
      .getResponse()
  }
}

const GetStatusHandler = {
  canHandle (handlerInput) {
    const request = handlerInput.requestEnvelope.request
    return request.type === 'LaunchRequest' ||
      (request.type === 'IntentRequest' &&
        request.intent.name === 'GetStatusIntent')
  },
  async handle (handlerInput) {
    const { temp, humidity } = await smartthings.getTemperatureAndHumidity()
    const speechOutput = `The indoor temperature is ${temp} degrees, and humidity is ${humidity} percent`

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .withSimpleCard('House status', `Indoor temperature ${temp}°C, humidity ${humidity}%`)
      .getResponse()
  }
}

const HelpHandler = {
  canHandle (handlerInput) {
    const request = handlerInput.requestEnvelope.request
    return request.type === 'IntentRequest' &&
      request.intent.name === 'AMAZON.HelpIntent'
  },
  handle (handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse()
  }
}

const ExitHandler = {
  canHandle (handlerInput) {
    const request = handlerInput.requestEnvelope.request
    return request.type === 'IntentRequest' &&
      (request.intent.name === 'AMAZON.CancelIntent' ||
        request.intent.name === 'AMAZON.StopIntent')
  },
  handle (handlerInput) {
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .getResponse()
  }
}

const SessionEndedRequestHandler = {
  canHandle (handlerInput) {
    const request = handlerInput.requestEnvelope.request
    return request.type === 'SessionEndedRequest'
  },
  handle (handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`)

    return handlerInput.responseBuilder.getResponse()
  }
}

const ErrorHandler = {
  canHandle () {
    return true
  },
  handle (handlerInput, error) {
    console.log(`Error handled: ${error.message}`)

    return handlerInput.responseBuilder
      .speak('Sorry, an error occurred.')
      .reprompt('Sorry, an error occurred.')
      .getResponse()
  }
}

const HELP_MESSAGE = 'You can say tell me the temperature, humidity, or status; or you can say exit... What can I help you with?'
const HELP_REPROMPT = 'What can I help you with?'
const STOP_MESSAGE = 'Goodbye!'

const skillBuilder = Alexa.SkillBuilders.custom()

exports.handler = skillBuilder
  .addRequestHandlers(
    GetTemperatureHandler,
    GetHumidityHandler,
    GetStatusHandler,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda()
