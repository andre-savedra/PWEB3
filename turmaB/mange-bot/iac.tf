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
  subscription_id = "250ae9c3-6c33-4030-b72a-ed22fce22920"
  features {    
  }
}

resource "azurerm_resource_group" "andre-savedra-robot-tB-group" {
  name = "andre-savedra-robot-tB-group"
  location = "eastus2"
}

resource "azurerm_service_plan" "andre-savedra-robot-tB-sp" {
    name = "andre-savedra-robot-tB-sp"
    resource_group_name = azurerm_resource_group.andre-savedra-robot-tB-group.name
    location = azurerm_resource_group.andre-savedra-robot-tB-group.location
    sku_name = "S1"
    os_type = "Windows"
}

resource "azurerm_windows_web_app" "andre-savedra-robot-tB-app" {
  name = "andre-savedra-robot-tB-app"
  resource_group_name = azurerm_resource_group.andre-savedra-robot-tB-group.name
  location = azurerm_resource_group.andre-savedra-robot-tB-group.location
  service_plan_id = azurerm_service_plan.andre-savedra-robot-tB-sp.id
  site_config {
    always_on = false
  }
}

resource "azurerm_windows_web_app_slot" "andre-savedra-robot-tB-app-QA" {
  name = "andre-savedra-robot-tB-app-QA"
  app_service_id = azurerm_windows_web_app.andre-savedra-robot-tB-app.id
  site_config {
    
  }
}