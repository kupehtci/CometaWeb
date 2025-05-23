# API Reference

## Introduction

This document provides details about the API endpoints available in our system.

## Authentication

All API requests require authentication using a bearer token:

```http
GET /api/resource
Authorization: Bearer your-token-here
```

## Endpoints

### Get All Items

```http
GET /api/items
```

#### Parameters

| Name     | Type    | Description                |
|----------|---------|----------------------------|
| page     | integer | Page number (default: 1)   |
| per_page | integer | Items per page (default: 20) |

#### Response

```json
{
  "items": [
    {
      "id": 1,
      "name": "Item 1",
      "description": "Description of item 1"
    },
    {
      "id": 2,
      "name": "Item 2",
      "description": "Description of item 2"
    }
  ],
  "meta": {
    "total": 50,
    "page": 1,
    "per_page": 20
  }
}
```

### Get Single Item

```http
GET /api/items/:id
```

#### Parameters

| Name | Type    | Description         |
|------|---------|---------------------|
| id   | integer | ID of the item      |

#### Response

```json
{
  "id": 1,
  "name": "Item 1",
  "description": "Description of item 1",
  "created_at": "2023-01-01T12:00:00Z",
  "updated_at": "2023-01-02T12:00:00Z"
}
```

## Error Handling

All errors follow this format:

```json
{
  "error": {
    "code": "error_code",
    "message": "Human readable error message"
  }
}
```

### Common Error Codes

| Code           | Description                           |
|----------------|---------------------------------------|
| unauthorized   | Authentication is required            |
| forbidden      | Insufficient permissions              |
| not_found      | Resource not found                    |
| invalid_input  | Validation failed for input parameters |