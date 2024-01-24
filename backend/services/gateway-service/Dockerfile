FROM gradle:8.5.0-jdk21-alpine AS builder

COPY common /backend/common
COPY buildSrc /backend/buildSrc
COPY gradle /backend/gradle
COPY settings.gradle /backend/settings.gradle
COPY services/gateway-service/build.gradle /backend/services/gateway-service/build.gradle
COPY services/gateway-service/src /backend/services/gateway-service/src

WORKDIR /backend/services/gateway-service/

RUN gradle build

FROM amazoncorretto:21-alpine3.19 AS runner

WORKDIR /app

COPY --from=builder /backend/services/gateway-service/build/libs/gateway-service-0.0.1-SNAPSHOT.jar /app/gateway-service.jar

ENTRYPOINT ["java", "-jar", "gateway-service.jar"]
