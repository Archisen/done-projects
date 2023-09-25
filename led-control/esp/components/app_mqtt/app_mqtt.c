
#include "esp_wifi.h"
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "driver/gpio.h"
#include "cJSON.h"
#include "esp_log.h"

#include "app_mqtt.h"

#define LED_PIN   GPIO_NUM_18

static const char *TAG = "MQTT_App";
esp_mqtt_client_handle_t mqtt_app_client;
bool data_flag = false;
char* mqtt_topic = "done-crusep23";

char* mqtt_app_message;


static esp_err_t mqtt_app_event_handler_cb(esp_mqtt_event_handle_t event)
{
    esp_mqtt_client_handle_t client = event->client;
    switch (event->event_id){
        case MQTT_EVENT_CONNECTED:
            ESP_LOGI(TAG, "MQTT_EVENT_CONNECTED");
            esp_mqtt_client_publish(client, "/esp32/test","esp32 Connected!", 0, 1, 0);
            ESP_LOGI(TAG,"We're connected!");
            break;
        case MQTT_EVENT_DISCONNECTED:
            ESP_LOGI(TAG,"MQTT_EVENT_DISCONNECTED");
            break;
        case MQTT_EVENT_SUBSCRIBED:
            ESP_LOGI(TAG,"MQTT_EVENT_SUBSCRIBED");
            break;
        case MQTT_EVENT_UNSUBSCRIBED:
            ESP_LOGI(TAG,"MQTT_EVENT_UNSUBSCRIBED");
            break;
        case MQTT_EVENT_DATA:
            ESP_LOGI(TAG,"MQTT_EVENT_DATA");
            mqtt_app_message = cJSON_Print(event->data);
            data_flag = true;
            break;
        case MQTT_EVENT_PUBLISHED:
            ESP_LOGI(TAG,"MQTT_EVENT_PUBLISHED");
            break;
        case MQTT_EVENT_ERROR:
            break;
        case MQTT_EVENT_BEFORE_CONNECT:
            break;
        default:
            ESP_LOGI(TAG, "Other event id:%d", event->event_id);
            break;
    }    
    return ESP_OK;
}

static void mqtt_app_event_handler(void *handler_args, esp_event_base_t base, int32_t event_id, void *event_data)
{
    ESP_LOGD(TAG, "Event dispatched from event loop base=%s, event_id=%d", base, event_id);
    mqtt_app_event_handler_cb(event_data);
}

void handle_incoming_data(); 
void mqtt_app_subscribe(char *topic);

static void mqtt_app_task(void* pvParameter)
{
    
    mqtt_app_subscribe(mqtt_topic);
    
    while(1)
    {
        if(data_flag == true) 
        {
            handle_incoming_data();
            data_flag = false;
        }
        vTaskDelay(10/portTICK_PERIOD_MS);
    }
}

void mqtt_app_start(void)
{
    esp_mqtt_client_config_t mqtt_cfg = 
    {
        .host = "192.168.0.213",
        .port = 1883,
    };

    mqtt_app_client = esp_mqtt_client_init(&mqtt_cfg);
    esp_mqtt_client_register_event(mqtt_app_client, ESP_EVENT_ANY_ID,mqtt_app_event_handler, NULL);
    esp_mqtt_client_start(mqtt_app_client);

    gpio_set_direction(LED_PIN, GPIO_MODE_OUTPUT);
    
    xTaskCreate(&mqtt_app_task, "mqtt_publish_task", 2048, NULL, 5, NULL);
}

void mqtt_app_publish(char *topic, char *data)
{
    const char *tpc = topic;
    const char *dta = data;
    esp_mqtt_client_publish(mqtt_app_client, tpc, dta, 0, 1, 0);
}

void mqtt_app_subscribe(char *topic)
{
    const char *tpc = topic;
    esp_mqtt_client_subscribe(mqtt_app_client, tpc, 1);
}

void handle_incoming_data(char* data)
{
    cJSON *data_JSON = cJSON_Parse(data);
    
}



