# NUFORC-API


## Setup

* Clone down this repo and run `npm install`
* Run the server by using `nodemon server.js`

The server will run on `http://localhost:3000`. All endpoints are prefixed with `/api/v1`.

## Data Model

An Encounter is returned as an array with an encounter object. The object has these properties: `id`, `description`, `shape`, `duration`, `report_link`, `date_time`, `date_posted`, `location_id`, `created_at`, and `updated_at`.


```js
[
    {
        "id": 139,
        "description": "WOW, saw some serious alien activity the other day, in Cincinnati",
        "shape": "circle",
        "duration": "1/2 hour",
        "report_link": "http://www.nuforc.org/webreports/050/S50571.html",
        "date_time": "2006-05-14T22:00:00",
        "date_posted": "2006-05-15T00:00:00",
        "location_id": 28679,
        "created_at": "2020-01-30T16:39:31.014Z",
        "updated_at": "2020-01-30T16:39:31.014Z"
    }
]
```

A location is returned as an array with a Location object. The object has these properties: `id`, `city`, `state`, `created_at`, and `updated_at`.

```js
[
    {
        "id": 28679,
        "city": "Cincinnati",
        "state": "OH",
        "created_at": "2020-01-30T16:39:30.103Z",
        "updated_at": "2020-01-30T16:39:30.103Z"
    }
]
```

## Endpoints

| Purpose | URL | Verb | Request Body | Sample Success Response |
|----|----|----|----|----|
| Get all locations |`/api/v1/locations`| GET | N/A | All locations on the server: `[{}, {}, ...]` |
| Get specific location |`/api/v1/locations/:id`| GET | N/A | Single Location `[{}]` |
| Get all encounters |`/api/v1/encounters`| GET | N/A | All encounters on the server: `[{}, {}, ...]` |
| Get specific encounter |`/api/v1/encounters/:id`| GET | N/A | Single Encounter `[{}]` |
| Post new location |`/api/v1/locations/`| POST | `{city: <string>, state: <id>}`| id: `3139` |
| Post new encounter |`/api/v1/encounters/`| POST | `{description: <string>, shape: <string>, duration: <string>, report_link: <string>, date_time: <string>, date_posted: <string>, location_id: <integer>}`| id: `139` |
