terraform {
  required_providers {
    azurerm = {
        source = "hashicorp/azurerm"
        version = "4.0.1"
    }
  }
}

provider "azurerm" {
  resource_provider_registrations = "none"
  subscription_id = "481c1d25-e4df-4209-9f20-6d3c0c28a214"
  features {    
  }
}

resource "azurerm_resource_group" "andre-savedra-robot-t2-group" {
  name = "andre-savedra-robot-t2-group"
  location = "eastus2"
}

resource "azurerm_service_plan" "andre-savedra-robot-t2-sp" {
    name = "andre-savedra-robot-t2-sp"
    resource_group_name = azurerm_resource_group.andre-savedra-robot-t2-group.name
    location = azurerm_resource_group.andre-savedra-robot-t2-group.location
    sku_name = "F1"
    os_type = "Windows"
}

resource "azurerm_windows_web_app" "andre-savedra-robot-t2-app" {
  name = "andre-savedra-robot-t2-app"
  resource_group_name = azurerm_resource_group.andre-savedra-robot-t2-group.name
  location = azurerm_resource_group.andre-savedra-robot-t2-group.location
  service_plan_id = azurerm_service_plan.andre-savedra-robot-t2-sp.id
  site_config {
    always_on = false
  }
}