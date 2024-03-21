import { GeoJSONPoint, PeliasGeoJSONProperties } from "@stadiamaps/api";

export interface Place {
  address: PeliasGeoJSONProperties,
  location: GeoJSONPoint
}

export interface Experience {
  _id?: ObjectId;
  title: string;
  place: Place;
  description: string;
  foodPhotoUrl: string;
  personPhotoUrl?: string;
  recipe?: string;
  experienceDate: string;
  createdDate?: string;
  mood?: string;
  foodtype?: string;
  personItRemindsThemOf?: string;
  flavourProfile?: string;
  periodOfLifeAssociation?: string;
  placesToGetFood?: Place[];
  creatorId: String | ObjectId;
}

export interface EventPostSkeleton {
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