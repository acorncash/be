plugins {
	java
	id("org.springframework.boot") version "3.1.2"
	id("io.spring.dependency-management") version "1.1.2"
}

group = "com.example"
version = "0.0.1-SNAPSHOT"

java {
	sourceCompatibility = JavaVersion.VERSION_17
}

repositories {
	mavenCentral()
}

dependencies {
	implementation("org.springframework.boot:spring-boot-starter-thymeleaf")
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("org.springframework.boot:spring-boot-starter-jdbc")
    implementation("org.junit.jupiter:junit-jupiter:5.8.1")
	implementation("org.mariadb.jdbc:mariadb-java-client:3.1.4")
	implementation("com.zaxxer:HikariCP:5.0.1")
	implementation("org.projectlombok:lombok:1.18.28")
	implementation("org.springframework.boot:spring-boot-starter-data-jpa")
	implementation("org.jetbrains:annotations:24.0.0")
	implementation("org.jetbrains:annotations:24.0.0")
	implementation("org.springframework.boot:spring-boot-starter-validation")
	implementation("org.hibernate:hibernate-validator:8.0.1.Final")
	implementation("javax.annotation:javax.annotation-api:1.3.2")

	testImplementation("org.springframework.boot:spring-boot-starter-test")
	compileOnly("org.projectlombok:lombok")
	annotationProcessor("org.projectlombok:lombok")
}

tasks.withType<Test> {
	useJUnitPlatform()
}
