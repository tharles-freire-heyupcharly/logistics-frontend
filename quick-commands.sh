#!/bin/bash

# Logistics System - Quick Commands
# Usage: ./quick-commands.sh [command]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Directories
BACKEND_DIR="/Users/tharles/heyupcharly/logistics/terraform"
FRONTEND_DIR="/Users/tharles/heyupcharly/logistics-frontend"

# Functions
print_header() {
    echo -e "${BLUE}========================================${NC}"
    echo -e "${BLUE} Logistics System Management${NC}"
    echo -e "${BLUE}========================================${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ️  $1${NC}"
}

# Command functions
start_frontend() {
    print_info "Starting frontend development server..."
    cd "$FRONTEND_DIR"
    npm start
}

start_backend() {
    print_info "Deploying backend infrastructure..."
    cd "$BACKEND_DIR"
    terraform apply -auto-approve
}

show_config() {
    print_header
    echo "🔧 AWS Configuration:"
    echo "User Pool ID: us-east-1_H8k7tGm0O"
    echo "Client ID: 5kovmbaag1265p23tbbt6ljj8h"
    echo "Identity Pool: us-east-1:e16ad6fc-f437-4ae6-85c7-194c50cd8109"
    echo "API URL: https://unv0m2gbd3.execute-api.us-east-1.amazonaws.com/dev"
    echo ""
    echo "👤 Test User:"
    echo "Username: testuser"
    echo "Email: testuser@logistics.com"
    echo "Password: LogisticsPass123!"
    echo ""
    echo "🌐 URLs:"
    echo "Frontend: http://localhost:3000"
    echo "API: https://unv0m2gbd3.execute-api.us-east-1.amazonaws.com/dev"
}

test_auth() {
    print_info "Testing authentication..."
    echo "Open http://localhost:3000 and use:"
    echo "Username: testuser"
    echo "Password: LogisticsPass123!"
}

test_api() {
    print_info "Testing API endpoint..."
    curl -X POST https://unv0m2gbd3.execute-api.us-east-1.amazonaws.com/dev/device \
        -H "Content-Type: application/json" \
        -d '{"deviceId": "test-device", "data": {"temperature": 25}}' \
        | jq '.'
}

install_deps() {
    print_info "Installing frontend dependencies..."
    cd "$FRONTEND_DIR"
    npm install
    print_success "Dependencies installed successfully!"
}

build_frontend() {
    print_info "Building frontend for production..."
    cd "$FRONTEND_DIR"
    npm run build
    print_success "Frontend built successfully!"
}

terraform_status() {
    print_info "Checking Terraform status..."
    cd "$BACKEND_DIR"
    terraform show | head -20
}

show_logs() {
    print_info "Showing recent logs..."
    cd "$FRONTEND_DIR"
    if [ -f "npm-debug.log" ]; then
        tail -20 npm-debug.log
    else
        echo "No log files found"
    fi
}

cleanup() {
    print_info "Cleaning up temporary files..."
    cd "$FRONTEND_DIR"
    rm -rf node_modules/.cache
    rm -rf build
    print_success "Cleanup completed!"
}

show_help() {
    print_header
    echo "Available commands:"
    echo ""
    echo "  start-frontend    Start React development server"
    echo "  start-backend     Deploy backend with Terraform"
    echo "  show-config       Display system configuration"
    echo "  test-auth         Test authentication flow"
    echo "  test-api          Test API endpoints"
    echo "  install-deps      Install frontend dependencies"
    echo "  build-frontend    Build frontend for production"
    echo "  terraform-status  Check Terraform state"
    echo "  show-logs         Display recent logs"
    echo "  cleanup           Clean temporary files"
    echo "  help              Show this help message"
    echo ""
    echo "Example: ./quick-commands.sh start-frontend"
}

# Main command handler
case "$1" in
    "start-frontend")
        start_frontend
        ;;
    "start-backend")
        start_backend
        ;;
    "show-config")
        show_config
        ;;
    "test-auth")
        test_auth
        ;;
    "test-api")
        test_api
        ;;
    "install-deps")
        install_deps
        ;;
    "build-frontend")
        build_frontend
        ;;
    "terraform-status")
        terraform_status
        ;;
    "show-logs")
        show_logs
        ;;
    "cleanup")
        cleanup
        ;;
    "help"|"")
        show_help
        ;;
    *)
        print_error "Unknown command: $1"
        show_help
        exit 1
        ;;
esac
