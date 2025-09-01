# Terraform configuration for AWS Cognito authentication

This setup will create a Cognito User Pool, an App Client, and an Identity Pool for your frontend app. You can extend it for custom domains, triggers, or social providers as needed.

## Files to be created:
- `main.tf`: Main resources
- `variables.tf`: Input variables
- `outputs.tf`: Output values
- `provider.tf`: AWS provider configuration

---

## provider.tf
```
provider "aws" {
  region = var.aws_region
}
```

## variables.tf
```
variable "aws_region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Project name prefix"
  type        = string
  default     = "logistics-frontend"
}
```

## main.tf
```
resource "aws_cognito_user_pool" "main" {
  name = "${var.project_name}-user-pool"

  auto_verified_attributes = ["email"]

  password_policy {
    minimum_length    = 8
    require_uppercase = true
    require_lowercase = true
    require_numbers   = true
    require_symbols   = false
  }
}

resource "aws_cognito_user_pool_client" "main" {
  name         = "${var.project_name}-app-client"
  user_pool_id = aws_cognito_user_pool.main.id
  generate_secret = false
  explicit_auth_flows = [
    "ALLOW_USER_SRP_AUTH",
    "ALLOW_REFRESH_TOKEN_AUTH"
  ]
  allowed_oauth_flows = ["code"]
  allowed_oauth_scopes = ["email", "openid", "profile"]
  supported_identity_providers = ["COGNITO"]
  callback_urls = ["http://localhost:3000/"]
  logout_urls   = ["http://localhost:3000/"]
}

resource "aws_cognito_identity_pool" "main" {
  identity_pool_name               = "${var.project_name}-identity-pool"
  allow_unauthenticated_identities = false

  cognito_identity_providers {
    client_id = aws_cognito_user_pool_client.main.id
    provider_name = aws_cognito_user_pool.main.endpoint
  }
}
```

## outputs.tf
```
output "user_pool_id" {
  value = aws_cognito_user_pool.main.id
}

output "user_pool_client_id" {
  value = aws_cognito_user_pool_client.main.id
}

output "identity_pool_id" {
  value = aws_cognito_identity_pool.main.id
}
```

---

**Instructions:**
1. Copy these files into a `terraform/` directory in your project.
2. Run `terraform init` and `terraform apply` in that directory.
3. Use the output values in your frontend AWS Amplify configuration.

Let me know if you want to proceed with creating these files automatically.
