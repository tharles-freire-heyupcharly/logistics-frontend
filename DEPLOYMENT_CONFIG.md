# Logistics System - Deployment Configuration

## 📋 System Overview
Frontend-backend integration with AWS Cognito authentication and complete API infrastructure.

## 🔧 AWS Infrastructure Configuration

### Cognito User Pool
- **User Pool ID:** `us-east-1_H8k7tGm0O`
- **Client ID:** `5kovmbaag1265p23tbbt6ljj8h`
- **Identity Pool ID:** `us-east-1:e16ad6fc-f437-4ae6-85c7-194c50cd8109`
- **Region:** `us-east-1`

### API Gateway
- **API ID:** `unv0m2gbd3`
- **Endpoint URL:** `https://unv0m2gbd3.execute-api.us-east-1.amazonaws.com/dev`
- **Stage:** `dev`

## 👤 Test Users

### Production Test User
- **Username:** `testuser`
- **Email:** `testuser@logistics.com`
- **Password:** `LogisticsPass123!`
- **Status:** Active, Email Verified
- **Created via:** Terraform automation

## 🌐 Application URLs

### Frontend
- **Development Server:** `http://localhost:3000`
- **Build Command:** `npm start`
- **Port:** `3000`

### Backend APIs
- **Base URL:** `https://unv0m2gbd3.execute-api.us-east-1.amazonaws.com/dev`
- **Device Endpoint:** `POST /device`

## 📁 Environment Variables

### Frontend (.env)
```bash
REACT_APP_COGNITO_REGION=us-east-1
REACT_APP_COGNITO_USER_POOL_ID=us-east-1_H8k7tGm0O
REACT_APP_COGNITO_USER_POOL_CLIENT_ID=5kovmbaag1265p23tbbt6ljj8h
REACT_APP_COGNITO_IDENTITY_POOL_ID=us-east-1:e16ad6fc-f437-4ae6-85c7-194c50cd8109
REACT_APP_API_URL=https://unv0m2gbd3.execute-api.us-east-1.amazonaws.com/dev
REACT_APP_COGNITO_REDIRECT_SIGN_IN=http://localhost:3000/
REACT_APP_COGNITO_REDIRECT_SIGN_OUT=http://localhost:3000/
```

## 🚀 Deployment Commands

### Backend (Terraform)
```bash
cd /Users/tharles/heyupcharly/logistics/terraform
terraform init
terraform plan
terraform apply
```

### Frontend (React)
```bash
cd /Users/tharles/heyupcharly/logistics-frontend
npm install
npm start
```

## 🔐 Authentication Flow

### Available Features
- ✅ User Sign In
- ✅ User Sign Up
- ✅ Email Confirmation
- ✅ Password Reset
- ✅ Resend Confirmation Code
- ✅ Protected Routes
- ✅ JWT Token Management

### Login Methods
1. **Email + Password:** Primary authentication method
2. **Username + Password:** Alternative method
3. **OAuth (configured):** Social login ready

## 📋 AWS Resources Created

### Cognito
- User Pool with email verification
- User Pool Client with SRP authentication
- Identity Pool for AWS resource access
- IAM roles for authenticated/unauthenticated users

### API Gateway
- REST API with CORS enabled
- Device endpoint for IoT data
- Lambda integrations
- Deployment stage configured

### Lambda Functions
- `map-packages`: Package mapping logic
- `calc-revenue`: Revenue calculations
- `offer-delivery`: Delivery offer management
- `assign-driver`: Driver assignment
- `send-notification`: Notification system

### Other AWS Services
- **S3 Bucket:** `logistics-project-data-lake`
- **Kinesis Stream:** `logistics-realtime-stream`
- **IoT Thing:** `driver-device`
- **Location Services:** Shipment tracking
- **Glue Job:** SAP ERP data extraction

## 🧪 Testing Instructions

### 1. Test Authentication
```bash
# Access the login page
open http://localhost:3000

# Use test credentials:
Username: testuser
Password: LogisticsPass123!
```

### 2. Test API Integration
```bash
# After login, APIs are automatically authenticated
# Test device endpoint:
curl -X POST https://unv0m2gbd3.execute-api.us-east-1.amazonaws.com/dev/device \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"deviceId": "test-device", "data": {"temperature": 25}}'
```

### 3. Test Registration Flow
1. Go to Sign Up tab
2. Fill registration form
3. Check email for confirmation code
4. Complete email verification
5. Login with new credentials

## 📦 Dependencies

### Frontend Key Packages
- `aws-amplify`: ^5.3.12
- `@aws-amplify/auth`: ^5.6.5
- `@aws-amplify/core`: ^5.8.5
- `react`: ^18.2.0
- `@mui/material`: ^5.11.0
- `react-router-dom`: ^6.8.0

### Backend Infrastructure
- AWS Provider: ~> 4.0
- Terraform: >= 1.0
- Node.js: v16.15.0 (compatible)
- AWS CLI: Latest

## 🔧 Troubleshooting

### Common Issues
1. **CORS Errors:** Check API Gateway CORS configuration
2. **Auth Errors:** Verify Cognito configuration in aws-config.ts
3. **Build Errors:** Check Node.js version compatibility

### Debug Commands
```bash
# Check Terraform state
terraform show

# Verify AWS CLI configuration
aws sts get-caller-identity

# Check React build
npm run build

# View detailed logs
npm start --verbose
```

## 📝 Notes
- All infrastructure managed via Terraform
- User data stored in Cognito User Pool
- Frontend configured for hot-reload development
- Backend APIs ready for production scaling
- Security: IAM roles, HTTPS, JWT tokens

---
**Last Updated:** September 1, 2025
**Status:** ✅ Production Ready
**Maintainer:** Logistics Team
