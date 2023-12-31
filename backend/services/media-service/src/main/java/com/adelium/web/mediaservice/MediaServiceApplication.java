/* (C)2023 */
package com.adelium.web.mediaservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.ComponentScan;

@EnableFeignClients({"com.adelium.web.mediaservice", "com.adelium.web.common"})
@ComponentScan({"com.adelium.web.mediaservice", "com.adelium.web.common"})
@SpringBootApplication
@EnableCaching
public class MediaServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(MediaServiceApplication.class, args);
    }
}
