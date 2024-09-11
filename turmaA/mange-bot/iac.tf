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
  features {}
}

resource "azurerm_resource_group" "andre_savedra_bot_group2" {
  name = "andre_savedra_bot_group2"
  location = "eastus2"
}

resource "azurerm_service_plan" "andre_savedra_bot_sp2" {
  name = "andre_savedra_bot_sp2"
  resource_group_name = azurerm_resource_group.andre_savedra_bot_group2.name
  location = azurerm_resource_group.andre_savedra_bot_group2.location
  sku_name = "S1"
  os_type = "Windows"
}

resource "azurerm_windows_web_app" "andre_sav_bot_app2" {
  name = "andre-savedra-bot-app2"
  resource_group_name = azurerm_resource_group.andre_savedra_bot_group2.name
  location = azurerm_resource_group.andre_savedra_bot_group2.location
  service_plan_id = azurerm_service_plan.andre_savedra_bot_sp2.id
  site_config {
    always_on = false
  }
}

resource "azurerm_windows_web_app_slot" "andre_savedra_bot_slot_qa2" {
  name = "andre-savedra-bot-slot-qa2"
  app_service_id = azurerm_windows_web_app.andre_sav_bot_app2.id
  site_config {

  }  
}

#az webapp deployment source config-zip --subscription 481c1d25-e4df-4209-9f20-6d3c0c28a214 --resource-group andre_savedra_bot_group2 --name andre-savedra-bot-app2 --src dist.zip


