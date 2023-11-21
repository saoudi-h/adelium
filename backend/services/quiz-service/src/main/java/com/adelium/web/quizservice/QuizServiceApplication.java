/* (C)2023 */
package com.adelium.web.quizservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.ComponentScan;

@EnableFeignClients({"com.adelium.web.quizservice", "com.adelium.web.common"})
@ComponentScan({"com.adelium.web.quizservice", "com.adelium.web.common"})
@SpringBootApplication
public class QuizServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(QuizServiceApplication.class, args);
    }
}
