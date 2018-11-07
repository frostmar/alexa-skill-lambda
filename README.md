# alexa-aws-lambda

An Alexa skill which reads data from Samsung SmartThings (humidity sensor), implemented as an AWS Lambda.

## Deployment
1. install production dependencies: `npm i --production`
2. zip all files
3. create/edit an AWS lambda https://eu-west-1.console.aws.amazon.com/lambda/home upload the zip
4. add an environment variable `SMARTTHINGS_ACCESS_TOKEN` with a SmartThings access token with at least `r:devices:*` scope
5. save/deploy the lambda
6. configure an Alexa skill which uses the lambda as it's endpoint
