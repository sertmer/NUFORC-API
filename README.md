# NUFORC-API


## Setup

* Clone down this repo and run `npm install`
* Run the server by using `nodemon server.js`

The server will run on `http://localhost:3000`. All endpoints are prefixed with `/api/v1`.

## Data Model

An Encounter object has the following properties:

```js
[
    {
        "id": 139,
        "description": "West side of Cincinnati-close to airport 10-11pm-Did anyone else see these? I saw one or the same thing that moved on the west side of (downtown Cincy)town. Round with bright white light that would go \"around\" then I saw \"search light type\" light up into the sky in mulitiple directions. Had other colors in sporadic patterns light up.Stayed in place for about 1/2 hour then disappeared. I went to another vantage point and saw it again doing the same actions. Later it was to the north of Cincy.  Did anyone else see this? Would have been so close to the airport, but it didn't move in any pattern it just hovered very high up within plane paths I think. I have seen these before but I never wrote about them. Am I crazy?",
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

## Endpoints

| Purpose | URL | Verb | Request Body | Sample Success Response |
|----|----|----|----|----|
| Get all orders |`/api/v1/orders`| GET | N/A | All orders on the server: `{orders: [{}, {}, ...]}` |
| Add new order |`/api/v1/orders`| POST | `{name: <String>, ingredients: <Array of Strings>}` | New order that was added: `{id: 2, name: "Alex", ingredients: ["cheese", "beans"]}` |
| Delete existing order |`/api/v1/orders/:order_id`| DELETE | N/A | For successful deletion: No response body (only 204 status code) |
