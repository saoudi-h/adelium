FROM gradle:8.5.0-jdk21-alpine AS builder

COPY common /backend/common
COPY buildSrc /backend/buildSrc
COPY gradle /backend/gradle
COPY settings.gradle /backend/settings.gradle
COPY services/quiz-service/build.gradle /backend/services/quiz-service/build.gradle
COPY services/quiz-service/src /backend/services/quiz-service/src

WORKDIR /backend/services/quiz-service/

ENV DOCKER_BUILD=true
RUN gradle build

FROM amazoncorretto:21-alpine3.19 AS runner

WORKDIR /app

COPY --from=builder /backend/services/quiz-service/build/libs/quiz-service-0.0.1-SNAPSHOT.jar /app/quiz-service.jar

ENTRYPOINT ["java", "-jar", "quiz-service.jar"]
