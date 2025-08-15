package com.example.fresherwelcome;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class FresherwelcomeApplication {

	public static void main(String[] args) {
		SpringApplication.run(FresherwelcomeApplication.class, args);
	}

}

/*
Sure! Here’s a concise summary of what we covered today, including notes on CSRF, sessions, and why these concepts matter in your Spring Boot + Spring Security app:

---

# Summary Notes from Today

### 1. **Spring Security Authentication with Custom Login**

* You built a custom login API (`/api/users/login`) that:

  * Checks user credentials manually via your service.
  * Loads `UserDetails` to provide Spring Security the user info and roles.
  * Creates an `Authentication` token and stores it in Spring Security’s `SecurityContext`.
  * Creates an HTTP session and saves the security context to keep the user logged in.
* **Why?**
  Spring Security manages security context and session internally for you, so your app can recognize logged-in users across multiple requests.

---

### 2. **UserDetailsService**

* You created a `CustomUserDetailsService` that implements `UserDetailsService` to load user info from your DB.
* Roles like `"ROLE_USER"` are assigned to represent authorities.
* **Why?**
  Spring Security uses this service to fetch user details (including roles and passwords) to verify identity and authorize access.

---

### 3. **Protecting URLs Based on Authentication**

* URLs (like `/protected/home`) can be protected via Spring Security configuration.
* Public resources (like login page and static assets) are allowed without authentication.
* **Why?**
  To restrict access to certain pages only for authenticated users and protect sensitive data.

---

### 4. **Sessions**

* When login is successful, an HTTP session is created and stores the security context.
* The session cookie is sent to the browser to maintain the logged-in state.
* **Why?**
  Sessions enable stateful authentication — so users don’t have to re-login on every request, and the server can recognize authenticated users.

---

### 5. **CSRF (Cross-Site Request Forgery)**

* Spring Security has CSRF protection enabled by default.
* CSRF attacks trick a logged-in user’s browser into sending unwanted requests (e.g., form submissions) to your app without consent.
* To allow safe state-changing requests (like POST login), CSRF tokens are used to verify request legitimacy.
* **Why?**
  To protect your app and users from malicious forged requests that could perform unwanted actions.

---

### 6. **Frontend Redirects & Integration**

* When login API responds with success, frontend redirects to the protected page (e.g., `/protected/home`).
* No manual JavaScript session management needed; browser sends session cookie automatically.
* **Why?**
  To keep frontend and backend session state in sync and secure.

---

### Bonus: Why `final` and constructor injection?

* `final` fields and constructor injection:

  * Improve immutability and clarity.
  * Make dependencies explicit and testable.
* **Why?**
  For cleaner, safer, and maintainable code.

---

# Why these concepts matter overall:

* **Authentication and sessions** are the backbone of secure user login systems.
* **UserDetailsService and roles** help manage who can do what in your app.
* **CSRF protection** is critical for defending against common web attacks.
* Integrating **Spring Security properly** ensures you don’t have to reinvent the wheel for secure session and role management.

---
 */