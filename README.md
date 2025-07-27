
---

```markdown
# 🎉 University of Information Technology Fresher Welcome Management Web App 🎓

A complete Spring Boot web application built to streamline and manage all activities related to the **Fresher Welcome Event** at the **University of Information Technology**. From student registration to King & Queen voting — everything is here!

---

## 🚀 Features

### 👥 For Students (Users)
- 🔐 Register & login securely
- 🙋 Register as a **volunteer** to help during the event
- 🍔 Preorder **food** items for the event
- 🛍️ Register as a **food seller** to sell during the event
- 📅 View the complete **Fresher Welcome Event Schedule**
- 💃 Register to **perform activities** (dance, music, etc.)
- 🗳️ Vote for **King & Queen** among freshers
- 📝 Send **feedback** after the event

---

### 🔧 For Admins
- ✅ Manage **volunteer registrations** (approve/reject)
- 🛒 Manage **seller requests**
- 🎭 Approve/Reject **activity performance** requests
- 🗂️ Create and manage **sub-events** within the main event
- 👑 Handle and view **King & Queen voting results**
- 📢 Post event announcements or updates

---

## 🛠️ Tech Stack

| Layer         | Technology         |
|---------------|--------------------|
| Backend       | Spring Boot        |
| Frontend      | HTML, CSS, JS (Thymeleaf or REST + JS) |
| Database      | MySQL              |
| ORM           | Spring Data JPA    |
| Build Tool    | Maven              |
| Versioning    | Git + GitHub       |

---

## 📂 Project Structure

```

university-fresher-welcome/
├── src/
│   └── main/
│       ├── java/com/uit/fresherwelcome/
│       │   ├── controller/
│       │   ├── model/
│       │   ├── repository/
│       │   └── service/
│       └── resources/
│           ├── static/
│           ├── templates/ (if Thymeleaf)
│           └── application.properties
├── pom.xml

````

---

## 🧪 Getting Started

### 📌 Prerequisites
- Java 17+
- Maven
- MySQL
- Git

### 📥 Clone the Project
```bash
git clone https://github.com/yourusername/uit-fresher-welcome.git
cd uit-fresher-welcome
````

### ⚙️ Configure MySQL in `application.properties`

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/uit_fresher_welcome
spring.datasource.username=your_user
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

### 🔨 Run the App

```bash
./mvnw spring-boot:run
```

Visit: `http://localhost:8080`

---

## 📸 Screenshots (optional)

*Add images of user dashboard, admin panel, voting screen, etc.*

---

## 🧠 Future Improvements

* Email/SMS notifications
* Dashboard analytics for admins
* Exporting data (PDF, CSV)
* Role-based access with Spring Security
* Mobile responsive design

---

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/awesome-feature`)
3. Commit your changes (`git commit -m 'Add awesome feature'`)
4. Push to the branch (`git push origin feature/awesome-feature`)
5. Open a Pull Request

---

## 📄 License

MIT License © 2025 \[Your Name / UIT Team]

---

## ❤️ Acknowledgments

* UIT Faculty & Students
* Spring Boot & Open Source Contributors
* UI inspiration from various modern web apps

---

> Built with 💻 by UIT Students for UIT Freshers 💙

```

Would you like to include actual screenshots, contributor names, or replace Thymeleaf with React/Vue in the README if your frontend is separate? I can also auto-generate a `LICENSE` or `.gitignore` file next.
```
