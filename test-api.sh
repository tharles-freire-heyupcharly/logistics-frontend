#!/bin/bash
echo "🧪 Testing API endpoint: https://unv0m2gbd3.execute-api.us-east-1.amazonaws.com/dev/device"
curl -X POST "https://unv0m2gbd3.execute-api.us-east-1.amazonaws.com/dev/device" \
  -H "Content-Type: application/json" \
  -d '{"route_id": "TEST1756745189", "packages": 5, "timestamp": "'2025-09-01T16:46:29Z'", "location": {"lat": 40.7128, "lng": -74.0060}}' | jq .
