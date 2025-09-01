#!/bin/bash

# Logistics Frontend and Backend Testing Script

set -e

echo "🚀 Logistics System Testing Setup"
echo "=================================="

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Get the directory of this script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRONTEND_DIR="$SCRIPT_DIR"
BACKEND_DIR="$(dirname "$SCRIPT_DIR")/logistics"

print_status "Frontend directory: $FRONTEND_DIR"
print_status "Backend directory: $BACKEND_DIR"

# Check if directories exist
if [ ! -d "$FRONTEND_DIR" ]; then
    print_error "Frontend directory not found: $FRONTEND_DIR"
    exit 1
fi

if [ ! -d "$BACKEND_DIR" ]; then
    print_error "Backend directory not found: $BACKEND_DIR"
    exit 1
fi

# Check prerequisites
print_status "Checking prerequisites..."

# Check Node.js
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed"
    exit 1
fi
print_success "Node.js version: $(node --version)"

# Check npm
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed"
    exit 1
fi
print_success "npm version: $(npm --version)"

# Check AWS CLI
if ! command -v aws &> /dev/null; then
    print_error "AWS CLI is not installed"
    exit 1
fi
print_success "AWS CLI version: $(aws --version)"

# Check Terraform
if ! command -v terraform &> /dev/null; then
    print_error "Terraform is not installed"
    exit 1
fi
print_success "Terraform version: $(terraform --version | head -n1)"

# Check AWS credentials
print_status "Checking AWS credentials..."
if aws sts get-caller-identity &> /dev/null; then
    AWS_ACCOUNT=$(aws sts get-caller-identity --query Account --output text)
    print_success "AWS credentials configured (Account: $AWS_ACCOUNT)"
else
    print_error "AWS credentials not configured"
    exit 1
fi

# Backend Setup
print_status "Setting up backend infrastructure..."
cd "$BACKEND_DIR/terraform"

if [ ! -d ".terraform" ]; then
    print_status "Initializing Terraform..."
    terraform init
fi

print_status "Checking backend deployment status..."
terraform plan -detailed-exitcode &> /dev/null
PLAN_EXIT_CODE=$?

if [ $PLAN_EXIT_CODE -eq 2 ]; then
    print_warning "Backend infrastructure changes detected. Applying..."
    terraform apply -auto-approve
elif [ $PLAN_EXIT_CODE -eq 0 ]; then
    print_success "Backend infrastructure is up to date"
else
    print_error "Error checking backend infrastructure"
    exit 1
fi

# Get API Gateway URL
API_URL=$(terraform output -raw api_gateway_url)
print_success "Backend API URL: $API_URL"

# Frontend Setup
print_status "Setting up frontend..."
cd "$FRONTEND_DIR"

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    print_status "Installing frontend dependencies..."
    npm install
fi

# Update .env file with current API URL
echo "REACT_APP_API_URL=$API_URL" > .env
echo "GENERATE_SOURCEMAP=false" >> .env
print_success "Frontend environment configured"

# Test backend API
print_status "Testing backend API..."
TEST_DATA='{"route_id": "TEST001", "packages": 3, "timestamp": "'$(date -u +%Y-%m-%dT%H:%M:%SZ)'", "location": {"lat": 40.7128, "lng": -74.0060}}'

if curl -s -X POST "$API_URL/device" \
   -H "Content-Type: application/json" \
   -d "$TEST_DATA" > /dev/null; then
    print_success "Backend API test successful"
else
    print_error "Backend API test failed"
    exit 1
fi

# Create startup commands
print_status "Creating startup commands..."

cat > start-frontend.sh << EOF
#!/bin/bash
cd "$FRONTEND_DIR"
echo "🌐 Starting frontend at http://localhost:3000"
npm start
EOF

cat > test-api.sh << EOF
#!/bin/bash
echo "🧪 Testing API endpoint: $API_URL/device"
curl -X POST "$API_URL/device" \\
  -H "Content-Type: application/json" \\
  -d '{"route_id": "TEST$(date +%s)", "packages": 5, "timestamp": "'$(date -u +%Y-%m-%dT%H:%M:%SZ)'", "location": {"lat": 40.7128, "lng": -74.0060}}' | jq .
EOF

chmod +x start-frontend.sh test-api.sh

print_success "Setup complete!"
echo ""
echo "🎯 Next Steps:"
echo "=============="
echo "1. Start the frontend:"
echo "   ./start-frontend.sh"
echo ""
echo "2. Open your browser to:"
echo "   http://localhost:3000"
echo ""
echo "3. Test the API directly:"
echo "   ./test-api.sh"
echo ""
echo "4. Backend API URL:"
echo "   $API_URL"
echo ""
echo "📊 Available endpoints:"
echo "- POST $API_URL/device (IoT device data)"
echo ""
echo "💡 The frontend is configured to connect to the backend automatically."
echo "   You can modify API calls in src/services/api.ts"
