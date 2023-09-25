#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "esp_system.h"
#include "esp_log.h"

#include "app_mqtt.h"
#include "app_provisioning.h"



void app_main(void)
{
    provision_esp();
    bool app_prov = app_provisioned();

    while (!app_prov){
        app_prov = app_provisioned();
        vTaskDelay(100/portTICK_PERIOD_MS);
    } 
    
    mqtt_app_start();
}
