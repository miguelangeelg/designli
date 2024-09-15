# Designli (The easy one Test)

## Overview
Designli is a service built with NestJS, Docker, and Swagger. It provides a single endpoint for processing email records and returning the processed response based on the input data.


## Technologies Used
- NestJS
- Docker
- Swagger: API documentation tool to describe and test the API endpoints.


## Packages installed
- Swagger: For API documentation and testing.
- class-transformer: For transforming plain objects into class instances and vice versa.

## Get started
The service exposes a single POST endpoint:

- Endpoint: **/email/process**
- Description: Processes email records and returns a structured response.
- Swagger Documentation: You can view and test the endpoint using  [Swagger](#Swagger-documentation)

## Sample Request
Below is an example of the JSON payload you can send to the endpoint:
```bash
{
  "Records": [
    {
      "eventVersion": "1.0",
      "ses": {
        "receipt": {
          "timestamp": "2015-09-11T20:32:33.936Z",
          "processingTimeMillis": 406,
          "recipients": [
            "recipient@example.com"
          ],
          "spamVerdict": {
            "status": "PASS"
          },
          "virusVerdict": {
            "status": "PASS"
          },
          "spfVerdict": {
            "status": "PASS"
          },
          "dkimVerdict": {
            "status": "PASS"
          },
          "dmarcVerdict": {
            "status": "PASS"
          },
          "dmarcPolicy": "reject",
          "action": {
            "type": "S3",
            "topicArn": "arn:aws:sns:us-east-1:012345678912:example-topic",
            "bucketName": "my-S3-bucket",
            "objectKey": "email"
          }
        },
        "mail": {
          "timestamp": "2015-09-11T20:32:33.936Z",
          "source": "0000014fbe1c09cf-7cb9f704-7531-4e53-89a1-5fa9744f5eb6-000000@amazonses.com",
          "messageId": "d6iitobk75ur44p8kdnnp7g2n800",
          "destination": [
            "recipient@example.com"
          ],
          "headersTruncated": false,
          "headers": [
            {
              "name": "Return-Path",
              "value": "<0000014fbe1c09cf-7cb9f704-7531-4e53-89a1-5fa9744f5eb6-000000@amazonses.com>"
            },
            {
              "name": "Received",
              "value": "from a9-183.smtp-out.amazonses.com (a9-183.smtp-out.amazonses.com [54.240.9.183]) by inbound-smtp.us-east-1.amazonaws.com with SMTP id d6iitobk75ur44p8kdnnp7g2n800 for recipient@example.com; Fri, 11 Sep 2015 20:32:33 +0000 (UTC)"
            },
            {
              "name": "DKIM-Signature",
              "value": "v=1; a=rsa-sha256; q=dns/txt; c=relaxed/simple; s=ug7nbtf4gccmlpwj322ax3p6ow6yfsug; d=amazonses.com; t=1442003552; h=From:To:Subject:MIME-Version:Content-Type:Content-Transfer-Encoding:Date:Message-ID:Feedback-ID; bh=DWr3IOmYWoXCA9ARqGC/UaODfghffiwFNRIb2Mckyt4=; b=p4ukUDSFqhqiub+zPR0DW1kp7oJZakrzupr6LBe6sUuvqpBkig56UzUwc29rFbJF hlX3Ov7DeYVNoN38stqwsF8ivcajXpQsXRC1cW9z8x875J041rClAjV7EGbLmudVpPX 4hHst1XPyX5wmgdHIhmUuh8oZKpVqGi6bHGzzf7g="
            },
            {
              "name": "From",
              "value": "sender@example.com"
            },
            {
              "name": "To",
              "value": "recipient@example.com"
            },
            {
              "name": "Subject",
              "value": "Example subject"
            },
            {
              "name": "MIME-Version",
              "value": "1.0"
            },
            {
              "name": "Content-Type",
              "value": "text/plain; charset=UTF-8"
            },
            {
              "name": "Content-Transfer-Encoding",
              "value": "7bit"
            },
            {
              "name": "Date",
              "value": "Fri, 11 Sep 2015 20:32:32 +0000"
            },
            {
              "name": "Message-ID",
              "value": "<61967230-7A45-4A9D-BEC9-87CBCF2211C9@example.com>"
            },
            {
              "name": "X-SES-Outgoing",
              "value": "2015.09.11-54.240.9.183"
            },
            {
              "name": "Feedback-ID",
              "value": "1.us-east-1.Krv2FKpFdWV+KUYw3Qd6wcpPJ4Sv/pOPpEPSHn2u2o4=:AmazonSES"
            }
          ],
          "commonHeaders": {
            "returnPath": "0000014fbe1c09cf-7cb9f704-7531-4e53-89a1-5fa9744f5eb6-000000@amazonses.com",
            "from": [
              "sender@example.com"
            ],
            "date": "Fri, 11 Sep 2015 20:32:32 +0000",
            "to": [
              "recipient@example.com"
            ],
            "messageId": "<61967230-7A45-4A9D-BEC9-87CBCF2211C9@example.com>",
            "subject": "Example subject"
          }
        }
      },
      "eventSource": "aws:ses"
    }
  ]
}
```

## How the service work
- Receiving Data: The service receives the JSON payload at the /email/process endpoint.

- Data Transformation: The JSON is passed to a service that converts it into complex objects using the plainToClass function from class-transformer.

- Response Construction: The service constructs the response according to the EmailProcessedDTO entity, defining the rules and properties to be exposed.

## Architecture Overview
### Modular Architecture
The solution uses a modular architecture with a single module (email) containing entities, models, and other related components.
- Factory Pattern: Used to convert JSON into a Record object, centralizing the creation logic and ensuring validation and error handling are managed within the factory.

## How to run
### Common run way (Recommended if you don't have docker installed)
It is important to have docker installed
```bash
 npm i
```
```bash
 npm run start:dev
```
and you can see it run in in 3000 port
### Docker
It is important to have docker installed
```bash
 docker compose up -d --build
```
and you can see it run in in 3000 port

## Swagger documentation
You can see the swagger documentation here:
[Swagger documentation](http://localhost:3000/api/)
(http://localhost:3000/api/)