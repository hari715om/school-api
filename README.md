# school-api 

# School Management API

## Endpoints

### 1. Add School
- **POST** `/addSchool`
- Request Body:
  ```json
  {
    "name": "Green Valley School",
    "address": "12 Oak Street, NY",
    "latitude": 40.7128,
    "longitude": -74.0060
  }
Response:

{ "message": "School added successfully!" }
2. List Schools
GET /listSchools

Response:

[
"id": 1,
    "name": "Green Valley School",
    "address": "12 Oak Street, NY",
    "latitude": 40.7128,
    "longitude": -74.0060
]
