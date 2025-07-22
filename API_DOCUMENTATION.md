# Review Collection System – Backend API Documentation

This document provides a comprehensive overview of all API endpoints for the Review Collection System Django backend, including required/request bodies, URL parameters, authentication requirements, and usage notes.

---

## Base URL

- **Development:** `http://localhost:8000/api/`
- **Production:** (Set as per deployment)

---

## Authentication

- **JWT-based authentication** is required for most endpoints.
- Obtain a token via login and include it in the `Authorization: Bearer <token>` header.

### Endpoints

| Method | Endpoint                  | Description                | Auth Required | Body/Params |
|--------|---------------------------|----------------------------|---------------|-------------|
| POST   | /auth/register/           | Register new user          | No            | `{username, email, password, password_confirm, first_name, last_name}` |
| POST   | /auth/login/              | Login, get JWT token       | No            | `{email, password}` |
| POST   | /auth/logout/             | Logout (invalidate token)  | Yes           | None        |
| GET    | /auth/profile/            | Get user profile           | Yes           | None        |
| PUT    | /auth/profile/            | Update user profile        | Yes           | `{first_name, last_name, ...}` |
| POST   | /auth/password/change/    | Change password            | Yes           | `{old_password, new_password}` |
| POST   | /auth/token/refresh/      | Refresh JWT token          | No            | `{refresh}` |

---

## Categories

| Method | Endpoint         | Description         | Auth Required | Body/Params |
|--------|------------------|---------------------|---------------|-------------|
| GET    | /categories/     | List all categories | No            | None        |

---

## Companies

| Method | Endpoint                | Description           | Auth Required | Body/Params |
|--------|-------------------------|-----------------------|---------------|-------------|
| GET    | /companies/             | List user's companies | Yes           | None        |
| POST   | /companies/             | Create new company    | Yes           | `{name, unique_id, ...}` |
| GET    | /companies/{id}/        | Get company details   | Yes           | URL param: id |
| PUT    | /companies/{id}/        | Update company        | Yes           | URL param: id, body: `{...}` |
| DELETE | /companies/{id}/        | Delete company        | Yes           | URL param: id |
| GET    | /companies/{id}/dashboard/ | Company dashboard stats | Yes        | URL param: id |

---

## Businesses

| Method | Endpoint                        | Description                | Auth Required | Body/Params |
|--------|----------------------------------|----------------------------|---------------|-------------|
| GET    | /businesses/                     | List businesses            | Yes           | None        |
| POST   | /businesses/                     | Create business            | Yes           | `{name, company, category, ...}` |
| GET    | /businesses/{id}/                | Get business details       | Yes           | URL param: id |
| PUT    | /businesses/{id}/                | Update business            | Yes           | URL param: id, body: `{...}` |
| DELETE | /businesses/{id}/                | Delete business            | Yes           | URL param: id |
| GET    | /businesses/{id}/reviews/        | Get business reviews       | Yes           | URL param: id |
| GET    | /businesses/{id}/public-reviews/ | Get public reviews         | No            | URL param: id |
| GET    | /businesses/{id}/stats/          | Get business statistics    | Yes           | URL param: id |

---

## Orders

| Method | Endpoint                              | Description                  | Auth Required | Body/Params |
|--------|----------------------------------------|------------------------------|---------------|-------------|
| GET    | /orders/                              | List orders                  | Yes           | None        |
| POST   | /orders/                              | Create new order             | Yes           | `{business, order_number, customer_email, ...}` |
| GET    | /orders/{id}/                         | Get order details            | Yes           | URL param: id |
| PUT    | /orders/{id}/                         | Update order                 | Yes           | URL param: id, body: `{...}` |
| DELETE | /orders/{id}/                         | Delete order                 | Yes           | URL param: id |
| POST   | /orders/{id}/send-review-request/      | Send review request email    | Yes           | URL param: id |
| POST   | /orders/webhook/                      | Intake order from webhook    | No            | `{order data}` |

---

## Reviews

| Method | Endpoint                        | Description                | Auth Required | Body/Params |
|--------|----------------------------------|----------------------------|---------------|-------------|
| GET    | /reviews/                        | List reviews               | Yes           | Query params: filtering supported |
| POST   | /reviews/                        | Create review              | Yes           | `{business, rating, comment, reviewer_name, ...}` |
| GET    | /reviews/{id}/                   | Get review details         | Yes           | URL param: id |
| PUT    | /reviews/{id}/                   | Update review              | Yes           | URL param: id, body: `{...}` |
| DELETE | /reviews/{id}/                   | Delete review              | Yes           | URL param: id |
| POST   | /reviews/{id}/approve/           | Approve review             | Yes (owner/admin) | URL param: id |
| POST   | /reviews/{id}/reject/            | Reject review              | Yes (owner/admin) | URL param: id |
| POST   | /reviews/{id}/respond/           | Add business response      | Yes (owner)   | `{business_response}` |
| POST   | /reviews/{id}/like/              | Like/unlike review         | Yes           | URL param: id |

---

## Review Criteria

| Method | Endpoint                  | Description                | Auth Required | Body/Params |
|--------|---------------------------|----------------------------|---------------|-------------|
| GET    | /review-criteria/         | List review criteria       | Yes           | None        |
| POST   | /review-criteria/         | Create new criteria        | Yes           | `{company, name, ...}` |
| GET    | /review-criteria/{id}/    | Get criteria details       | Yes           | URL param: id |
| PUT    | /review-criteria/{id}/    | Update criteria            | Yes           | URL param: id, body: `{...}` |
| DELETE | /review-criteria/{id}/    | Delete criteria            | Yes           | URL param: id |

---

## Email Templates

| Method | Endpoint                  | Description                | Auth Required | Body/Params |
|--------|---------------------------|----------------------------|---------------|-------------|
| GET    | /email-templates/         | List email templates       | Yes           | None        |
| POST   | /email-templates/         | Create email template      | Yes           | `{company, subject, body, ...}` |
| GET    | /email-templates/{id}/    | Get template details       | Yes           | URL param: id |
| PUT    | /email-templates/{id}/    | Update template            | Yes           | URL param: id, body: `{...}` |
| DELETE | /email-templates/{id}/    | Delete template            | Yes           | URL param: id |

---

## Widget Settings

| Method | Endpoint                  | Description                | Auth Required | Body/Params |
|--------|---------------------------|----------------------------|---------------|-------------|
| GET    | /widget-settings/         | List widget settings       | Yes           | None        |
| POST   | /widget-settings/         | Create widget settings     | Yes           | `{company, ...}` |
| GET    | /widget-settings/{id}/    | Get widget settings        | Yes           | URL param: id |
| PUT    | /widget-settings/{id}/    | Update widget settings     | Yes           | URL param: id, body: `{...}` |
| DELETE | /widget-settings/{id}/    | Delete widget settings     | Yes           | URL param: id |

---

## QR Feedback

| Method | Endpoint                                 | Description                | Auth Required | Body/Params |
|--------|-------------------------------------------|----------------------------|---------------|-------------|
| GET    | /qr-feedback/                            | List QR feedback           | Yes           | None        |
| POST   | /qr-feedback/                            | Create QR feedback         | Yes           | `{company, branch_id, rating, ...}` |
| GET    | /qr-feedback/{id}/                       | Get QR feedback details    | Yes           | URL param: id |
| PUT    | /qr-feedback/{id}/                       | Update QR feedback         | Yes           | URL param: id, body: `{...}` |
| DELETE | /qr-feedback/{id}/                       | Delete QR feedback         | Yes           | URL param: id |
| GET    | /public/qr-code/{company_id}/{branch_id}/| Generate QR code           | No            | URL params: company_id, branch_id |
| POST   | /public/qr-feedback/{company_id}/{branch_id}/ | Submit QR feedback    | No            | `{rating, comment, ...}` |

---

## Payments

| Method | Endpoint                  | Description                | Auth Required | Body/Params |
|--------|---------------------------|----------------------------|---------------|-------------|
| GET    | /payments/                | List payments              | Yes           | None        |
| POST   | /payments/                | Create payment             | Yes           | `{company, plan_type, ...}` |
| GET    | /payments/{id}/           | Get payment details        | Yes           | URL param: id |

---

## Public APIs (No Authentication Required)

| Method | Endpoint                                 | Description                | Body/Params |
|--------|-------------------------------------------|----------------------------|-------------|
| GET    | /public/review-form/{token}/             | Get review form data       | URL param: token |
| POST   | /public/submit-review/{token}/           | Submit public review       | `{rating, comment, ...}` |
| GET    | /public/widget/{company_id}/             | Get widget data            | URL param: company_id |
| GET    | /public/qr-code/{company_id}/{branch_id}/| Generate QR code           | URL params: company_id, branch_id |
| POST   | /public/qr-feedback/{company_id}/{branch_id}/ | Submit QR feedback    | `{rating, comment, ...}` |

---

## Bulk Actions & Export

| Method | Endpoint                  | Description                | Auth Required | Body/Params |
|--------|---------------------------|----------------------------|---------------|-------------|
| GET    | /export/{company_id}/     | Export reviews (CSV/Excel) | Yes           | URL param: company_id |
| POST   | /bulk-approve/            | Bulk approve reviews       | Yes           | `{review_ids: [id, ...]}` |
| POST   | /bulk-reject/             | Bulk reject reviews        | Yes           | `{review_ids: [id, ...]}` |

---

## Webhooks

| Method | Endpoint                  | Description                | Body/Params |
|--------|---------------------------|----------------------------|-------------|
| POST   | /paypal/webhook/          | PayPal webhook             | PayPal event payload |

---

## Widget Embed

| Method | Endpoint                  | Description                | Body/Params |
|--------|---------------------------|----------------------------|-------------|
| GET    | /widget/{company_id}/embed/ | Get embeddable widget HTML | URL param: company_id |

---

## Notes

- All endpoints (except public ones) require JWT authentication.
- Use `Content-Type: application/json` for all POST/PUT requests.
- Pagination, filtering, and ordering are supported on most list endpoints via query params.
- For full schema and try-it-out, visit `/api/schema/swagger/` or `/api/schema/redoc/` when the server is running.

---

## Example: Create a Review

```bash
curl -X POST http://localhost:8000/api/reviews/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_ACCESS_TOKEN>" \
  -d '{
    "business": 1,
    "rating": 5,
    "comment": "Great experience!",
    "reviewer_name": "Happy Customer"
  }'
```

---

For more details, see the backend README or the DRF schema endpoints.
