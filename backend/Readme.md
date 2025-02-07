## Endpoints

### POST /users/register

This endpoint is used to register a new user.

#### Request Body

The request body must be a JSON object with the following fields:

- `fullname`: An object containing the user's first name and last name.
  - `firstname`: A string that must be at least 3 characters long.
  - `lastname`: A string that must be at least 3 characters long.
- `email`: A string that must be a valid email address.
- `password`: A string that must be at least 6 characters long.

Example:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### Resonse Example
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "60c72b2f9b1d4c3a5c8e4e3b",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
```

### POST /users/login 

This endpoint authenticates an existing user.

#### Request Body

The request body must be a JSON object with the following fields:

- `email`: A string that must be a valid email address
- `password`: A string that must be at least 6 characters long

Example:
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "60c72b2f9b1d4c3a5c8e4e3b",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
```

### GET /users/profile

This endpoint retrieves the authenticated user's profile.

#### Authentication
Requires JWT token in Authorization header or cookie.

#### Response Example

```json
{
  "_id": "60c72b2f9b1d4c3a5c8e4e3b",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "socketId": null
}
```

### GET /users/logout
This endpoint logs out the current user and invalidates their token.

#### Authentication
Requires JWT token in Authorization header or cookie.

#### Response Example

```json
{
  "message": "Logged out successfully"
}
```

### POST /captains/register

This endpoint is used to register a new captain.

#### Request Body

The request body must be a JSON object with the following fields:

- `fullname`: An object containing the captain's first and last name
  - `firstname`: String, minimum 3 characters
  - `lastname`: String, minimum 3 characters
- `email`: String, must be a valid email address
- `password`: String, minimum 6 characters
- `status`: String(Optional), must be one of : ['active', 'inactive']
- `vehicle`: An object containing vehicle details
  - `name`: String, minimum 3 characters
  - `plate`: String, minimum 3 characters
  - `capacity`: Number, minimum value 1
  - `type`: String, must be one of: ['car', 'motorcycle', 'auto']

#### Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "60c72b2f9b1d4c3a5c8e4e3b",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.driver@example.com",
    "status": "inactive",
    "vehicle": {
      "name": "Black sedan",
      "plate": "ABC123",
      "capacity": 4,
      "type": "car"
    },
    "socketId": null,
    "location": {
      "ltd": null,
      "lng": null
    }
  }
}
```

### POST /captains/login

This endpoint authenticates an existing captain.

#### Request Body

The request body must be a JSON object with the following fields:

- `email`: A string that must be a valid email address
- `password`: A string that must be at least 6 characters long

Example:
```json
{
  "email": "john.driver@example.com",
  "password": "password123"
}
```

#### Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "60c72b2f9b1d4c3a5c8e4e3b",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.driver@example.com",
    "status": "inactive",
    "vehicle": {
      "name": "Black sedan", 
      "plate": "ABC123",
      "capacity": 4,
      "type": "car"
    },
    "socketId": null,
    "location": {
      "ltd": null,
      "lng": null
    }
  }
}
```

### GET /captains/profile
This endpoint retrieves the authenticated captain's profile.

#### Authentication
Requires JWT token in Authorization header or cookie.

#### Response Example
```json
{
  "_id": "60c72b2f9b1d4c3a5c8e4e3b",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.driver@example.com",
  "status": "inactive",
  "vehicle": {
    "name": "Black sedan",
    "plate": "ABC123", 
    "capacity": 4,
    "type": "car"
  },
  "socketId": null,
  "location": {
    "ltd": null,
    "lng": null
  }
}
```

### GET /captains/logout
This endpoint logs out the current captain and invalidates their token.

#### Authentication
Requires JWT token in Authorization header or cookie.

#### Response Example
```json
{
  "message": "Captain logged out Successfully"
}
```

### POST /rides/create

This endpoint is used to create a new ride.

#### Request Body

The request body must be a JSON object with the following fields:

- `pickup`: A string representing the pickup address.
- `destination`: A string representing the destination address.
- `vehicleType`: A string representing the type of vehicle.
- `pickupFirstAddress`: A string representing the first address of the pickup location.
- `destinationFirstAddress`: A string representing the first address of the destination location.

Example:
```json
{
  "pickup": "123 Main St",
  "destination": "456 Elm St",
  "vehicleType": "car",
  "pickupFirstAddress": "123",
  "destinationFirstAddress": "456"
}
```

#### Response Example
```json
{
  "_id": "60c72b2f9b1d4c3a5c8e4e3b",
  "user": "60c72b2f9b1d4c3a5c8e4e3a",
  "pickup": "123 Main St",
  "destination": "456 Elm St",
  "fare": "50.00",
  "otp": "123456",
  "pickupFirstAddress": "123",
  "destinationFirstAddress": "456",
  "status": "pending"
}
```

### GET /rides/get-fare

This endpoint is used to get the fare for a ride.

#### Query Parameters

- `pickup`: A string representing the pickup address.
- `destination`: A string representing the destination address.

Example:
```
/ride/get-fare?pickup=123%20Main%20St&destination=456%20Elm%20St
```

#### Response Example
```json
{
  "auto": "30.00",
  "car": "50.00",
  "moto": "20.00"
}
```

### POST /rides/confirm

This endpoint is used to confirm a ride.

#### Request Body

The request body must be a JSON object with the following fields:

- `rideId`: A string representing the ride ID.

Example:
```json
{
  "rideId": "60c72b2f9b1d4c3a5c8e4e3b"
}
```

#### Response Example
```json
{
  "_id": "60c72b2f9b1d4c3a5c8e4e3b",
  "user": "60c72b2f9b1d4c3a5c8e4e3a",
  "pickup": "123 Main St",
  "destination": "456 Elm St",
  "fare": "50.00",
  "otp": "123456",
  "pickupFirstAddress": "123",
  "destinationFirstAddress": "456",
  "status": "accepted",
  "captain": "60c72b2f9b1d4c3a5c8e4e3c"
}
```

### GET /rides/start-ride

This endpoint is used to start a ride.

#### Query Parameters

- `rideId`: A string representing the ride ID.
- `otp`: A string representing the OTP.

Example:
```
/ride/start-ride?rideId=60c72b2f9b1d4c3a5c8e4e3b&otp=123456
```

#### Response Example
```json
{
  "_id": "60c72b2f9b1d4c3a5c8e4e3b",
  "user": "60c72b2f9b1d4c3a5c8e4e3a",
  "pickup": "123 Main St",
  "destination": "456 Elm St",
  "fare": "50.00",
  "otp": "123456",
  "pickupFirstAddress": "123",
  "destinationFirstAddress": "456",
  "status": "ongoing",
  "captain": "60c72b2f9b1d4c3a5c8e4e3c"
}
```

### POST /ride/end-ride

This endpoint is used to end a ride.

#### Request Body

The request body must be a JSON object with the following fields:

- `rideId`: A string representing the ride ID.

Example:
```json
{
  "rideId": "60c72b2f9b1d4c3a5c8e4e3b"
}
```

#### Response Example
```json
{
  "_id": "60c72b2f9b1d4c3a5c8e4e3b",
  "user": "60c72b2f9b1d4c3a5c8e4e3a",
  "pickup": "123 Main St",
  "destination": "456 Elm St",
  "fare": "50.00",
  "otp": "123456",
  "pickupFirstAddress": "123",
  "destinationFirstAddress": "456",
  "status": "completed",
  "captain": "60c72b2f9b1d4c3a5c8e4e3c"
}
```

### GET /maps/get-coordinates

This endpoint is used to get the coordinates of an address.

#### Query Parameters

- `address`: A string representing the address.

Example:
```
/maps/get-coordinates?address=123%20Main%20St
```

#### Response Example
```json
{
  "ltd": 37.7749,
  "lng": -122.4194
}
```

### GET /maps/get-distance-time

This endpoint is used to get the distance and time between two locations.

#### Query Parameters

- `origin`: A string representing the origin address.
- `destination`: A string representing the destination address.

Example:
```
/maps/get-distance-time?origin=123%20Main%20St&destination=456%20Elm%20St
```

#### Response Example
```json
{
  "distance": {
    "text": "5.3 km",
    "value": 5300
  },
  "duration": {
    "text": "15 mins",
    "value": 900
  }
}
```

### GET /maps/get-suggestions

This endpoint is used to get address suggestions based on input.

#### Query Parameters

- `input`: A string representing the input query.

Example:
```
/maps/get-suggestions?input=Main%20St
```

#### Response Example
```json
[
  {
    "description": "Main St, San Francisco, CA, USA",
    "place_id": "ChIJd_Y0eVIvkIARuQyDN0F1LBA"
  },
  {
    "description": "Main St, Los Angeles, CA, USA",
    "place_id": "ChIJd_Y0eVIvkIARuQyDN0F1LBB"
  }
]
```