FROM gradle:8.5.0-jdk21-alpine AS builder

COPY common /backend/common
COPY buildSrc /backend/buildSrc
COPY gradle /backend/gradle
COPY settings.gradle /backend/settings.gradle
COPY services/discovery-service/build.gradle /backend/services/discovery-service/build.gradle
COPY services/discovery-service/src /backend/services/discovery-service/src

WORKDIR /backend/services/discovery-service/

RUN gradle build

FROM amazoncorretto:21-alpine3.19 AS runner

WORKDIR /app

COPY --from=builder /backend/services/discovery-service/build/libs/discovery-service-0.0.1-SNAPSHOT.jar /app/discovery-service.jar

ENTRYPOINT ["java", "-jar", "discovery-service.jar"]
