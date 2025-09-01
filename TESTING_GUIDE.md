# Logistics System - Complete Testing Setup

This guide will help you run and test both the frontend and backend components of the logistics management system.

## 🏗️ System Architecture

- **Frontend**: React TypeScript application running on `http://localhost:3000`
- **Backend**: AWS serverless infrastructure with Lambda functions, API Gateway, Kinesis, S3, etc.
- **Integration**: Frontend connects to backend via REST API endpoints

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- AWS CLI configured with valid credentials
- Terraform v1.0+

### 1. Automated Setup
Run the automated setup script:
```bash
cd logistics-frontend
./setup-testing.sh
```

This script will:
- Check all prerequisites
- Deploy/verify backend infrastructure
- Configure frontend environment
- Test API connectivity
- Create helper scripts

### 2. Start Frontend
```bash
./start-frontend.sh
```
Open your browser to: `http://localhost:3000`

### 3. Test Backend API
```bash
./test-api.sh
```

## 📊 Available Services

### Backend API Endpoints
- **Base URL**: `https://unv0m2gbd3.execute-api.us-east-1.amazonaws.com/dev`
- **POST /device**: Submit IoT device data (package tracking, location, etc.)

### Frontend Features
- Dashboard with analytics and metrics
- Driver management interface
- Route management system
- Settings configuration
- Real-time data visualization

## 🧪 Manual Testing

### Test Backend API Directly
```bash
curl -X POST https://unv0m2gbd3.execute-api.us-east-1.amazonaws.com/dev/device \
  -H "Content-Type: application/json" \
  -d '{
    "route_id": "R001", 
    "packages": 5, 
    "timestamp": "2025-09-01T12:00:00Z",
    "location": {"lat": 40.7128, "lng": -74.0060}
  }'
```

### Test Frontend-Backend Integration
1. Open the frontend at `http://localhost:3000`
2. Navigate to different pages (Dashboard, Driver Management, etc.)
3. Check browser console for any API calls
4. Use Settings page to verify AWS integration configuration

## 🔧 Configuration

### Frontend Configuration
Environment variables in `.env`:
```env
REACT_APP_API_URL=https://unv0m2gbd3.execute-api.us-east-1.amazonaws.com/dev
GENERATE_SOURCEMAP=false
```

### Backend Configuration
The backend is deployed using Terraform and includes:
- **Lambda Functions**: 5 serverless functions for business logic
- **API Gateway**: REST API for frontend communication
- **Kinesis**: Real-time data streaming
- **S3**: Data lake storage
- **IoT Core**: Device management
- **Location Service**: Mapping and geocoding

## 📁 Project Structure

```
logistics-frontend/
├── src/
│   ├── components/     # React components
│   ├── pages/         # Application pages
│   ├── services/      # API integration
│   └── ...
├── .env              # Environment configuration
├── setup-testing.sh  # Automated setup script
├── start-frontend.sh # Frontend startup
└── test-api.sh       # API testing

logistics/
├── terraform/        # Infrastructure as Code
│   ├── main.tf      # Terraform configuration
│   └── ...
├── lambdas/         # Python Lambda functions
└── ...
```

## 🔍 Debugging

### Frontend Issues
- Check browser console for errors
- Verify `.env` file has correct API URL
- Ensure frontend is running on port 3000

### Backend Issues
- Check AWS CloudWatch logs for Lambda function errors
- Verify API Gateway deployment status
- Test individual Lambda functions in AWS Console

### Integration Issues
- Verify API URL in frontend configuration
- Check CORS settings in API Gateway
- Test API endpoints directly with curl

## 🛠️ Development Workflow

1. **Make Frontend Changes**: Edit files in `src/`, hot reload will update automatically
2. **Make Backend Changes**: Modify Lambda functions or Terraform config, then run:
   ```bash
   cd logistics/terraform
   terraform apply
   ```
3. **Test Changes**: Use the provided testing scripts or manual testing procedures

## 📈 Monitoring

- **Frontend**: Browser developer tools, React DevTools
- **Backend**: AWS CloudWatch logs and metrics
- **API**: API Gateway metrics and CloudWatch logs

## 🎯 Next Steps

1. **Extend API**: Add more endpoints for routes, drivers, analytics
2. **Enhance Frontend**: Implement real-time updates, advanced visualizations
3. **Add Authentication**: Implement AWS Cognito or similar
4. **Performance**: Add caching, optimization
5. **Testing**: Add unit tests, integration tests, E2E tests

## 🆘 Troubleshooting

### Common Issues
1. **"Command not found" errors**: Ensure all prerequisites are installed
2. **AWS permission errors**: Check AWS credentials and IAM permissions
3. **Node version warnings**: The app works with Node 16+, warnings can be ignored
4. **API connection errors**: Verify backend deployment and API URL

### Getting Help
- Check CloudWatch logs for backend errors
- Use browser console for frontend debugging
- Verify AWS resource status in AWS Console
- Test API endpoints individually

---

✅ **System Ready**: Both frontend and backend are now configured and ready for testing!
