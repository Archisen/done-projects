idf_component_register(
    SRCS "app_provisioning.c"
    INCLUDE_DIRS "include"
    REQUIRES nvs_flash lwip wifi_provisioning
)