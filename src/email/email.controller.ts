import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { EmailService } from './email.service';
import { Response } from 'express';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { RecordsDto } from './dto/process-email.dto';

@ApiTags('Emails')
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) { }

  @Post('process')
  @ApiBody({
    description: 'Get JSON from post, conver it in a class and then evaluate it to return a final response',
    type: RecordsDto,
    examples: {
      example1: {
        summary: 'Example payload',
        value: {
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
      }
    }
  })
  async process(@Body() createEmailDto: RecordsDto, @Res() res: Response) {
    try {
      const response = await this.emailService.processEmail(createEmailDto);
      res.status(HttpStatus.OK).json(response);
    } catch (error) {
      const status = error.getStatus ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
      const message = error.message || 'Internal Server Error';
      return res.status(status).json({
        statusCode: status,
        message: message,
      });
    }
  }
}
