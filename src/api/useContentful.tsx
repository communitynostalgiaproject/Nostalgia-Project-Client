import React from 'react';
import { createClient } from 'contentful';
import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

type EventPostSkeleton = {
    contentTypeId: "random_string"
    fields: {
        "name": "Event",
        "description": "",
        "displayField": "title",
        "fields": [
            {
            "id": "title",
            "name": "Title",
            "type": "Symbol",
            "localized": false,
            "required": true,
            "validations": [],
            "disabled": false,
            "omitted": false
            },
            {
            "id": "dateAndTime",
            "name": "Date and Time",
            "type": "Date",
            "localized": false,
            "required": true,
            "validations": [],
            "disabled": false,
            "omitted": false
            },
            {
            "id": "eventInfo",
            "name": "Event Info",
            "type": "RichText",
            "localized": false,
            "required": true,
            "validations": [
                {
                "enabledMarks": [],
                "message": "Marks are not allowed"
                },
                {
                "enabledNodeTypes": [
                    "hyperlink"
                ],
                "message": "Only link to Url nodes are allowed"
                },
                {
                "nodes": {
                    "asset-hyperlink": [
                    {
                        "size": {
                        "max": 1
                        },
                        "message": ""
                    }
                    ]
                }
                }
            ],
            "disabled": false,
            "omitted": false
            },
            {
            "id": "website",
            "name": "Website",
            "type": "RichText",
            "localized": false,
            "required": false,
            "validations": [
                {
                "enabledMarks": [],
                "message": "Marks are not allowed"
                },
                {
                "enabledNodeTypes": [
                    "hyperlink"
                ],
                "message": "Only link to Url nodes are allowed"
                },
                {
                "nodes": {}
                }
            ],
            "disabled": false,
            "omitted": false
            },
            {
            "id": "thumbnail",
            "name": "Thumbnail",
            "type": "Link",
            "localized": false,
            "required": true,
            "validations": [
                {
                "linkMimetypeGroup": [
                    "image"
                ]
                }
            ],
            "disabled": false,
            "omitted": false,
            "linkType": "Asset"
            }
        ],
        "sys": {
            "space": {
            "sys": {
                "type": "Link",
                "linkType": "Space",
                "id": "zs1lze0d37xl"
            }
            },
            "id": "event",
            "type": "ContentType",
            "createdAt": "2024-02-14T22:31:56.459Z",
            "updatedAt": "2024-02-14T22:31:56.967Z",
            "environment": {
            "sys": {
                "id": "master",
                "type": "Link",
                "linkType": "Environment"
            }
            },
            "publishedVersion": 1,
            "publishedAt": "2024-02-14T22:31:56.967Z",
            "firstPublishedAt": "2024-02-14T22:31:56.967Z",
            "createdBy": {
            "sys": {
                "type": "Link",
                "linkType": "User",
                "id": "3w6vz9aInSIS8Tvf2vtwvU"
            }
            },
            "updatedBy": {
            "sys": {
                "type": "Link",
                "linkType": "User",
                "id": "3w6vz9aInSIS8Tvf2vtwvU"
            }
            },
            "publishedCounter": 1,
            "version": 2,
            "publishedBy": {
            "sys": {
                "type": "Link",
                "linkType": "User",
                "id": "3w6vz9aInSIS8Tvf2vtwvU"
            }
            }
        }
    }
};

const useContentful = () => {

   const contentfulClient = createClient({
       // space: process.env.CONTENTFUL_SPACE_ID,
       // accessToken: process.env.CONTENTFUL_ACCESS_ID
       space: 'zs1lze0d37xl',
       accessToken: 'KXiJBT5G8g6UAY75gbHlzcpGio0RhcoMykOG915AcRw'
   });

   const getEvents = async () => {
       try {
           const events = await contentfulClient.getEntries();

           return events;
       } catch(err) {
           console.log(`ERROR FETCHING CONTENFUL DATA --> ${err}`);
       };
   };

   return { getEvents }
};

export default useContentful;
