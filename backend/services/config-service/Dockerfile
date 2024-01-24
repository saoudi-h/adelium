FROM gradle:8.5.0-jdk21-alpine AS builder

COPY common /backend/common
COPY buildSrc /backend/buildSrc
COPY gradle /backend/gradle
COPY settings.gradle /backend/settings.gradle
COPY services/config-service/build.gradle /backend/services/config-service/build.gradle
COPY services/config-service/src /backend/services/config-service/src

WORKDIR /backend/services/config-service/

RUN gradle build

FROM amazoncorretto:21-alpine3.19 AS runner

WORKDIR /app

COPY --from=builder /backend/services/config-service/build/libs/config-service-0.0.1-SNAPSHOT.jar /app/config-service.jar

ENTRYPOINT ["java", "-jar", "config-service.jar"]
