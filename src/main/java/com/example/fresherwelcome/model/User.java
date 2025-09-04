package com.example.fresherwelcome.model;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import java.util.List;

@Entity
@Table(name = "users")  // table name in DB
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;  // primary key

    @NotBlank
    private String name;

    @NotBlank
    @Column(name = "tnt", nullable = false,unique = true)
    private String tnt;  // store TNT as String (e.g. "201", "5687")

    @NotBlank
    @Email
    @Column(unique = true, nullable = false)
    private String email;

    @NotBlank
    @Column(name = "hashed_password", nullable = false)
    private String hashedPassword;

    @NotBlank
    @Column(nullable = false)
    @Pattern(regexp = "admin|student", message = "Role must be admin or student")
    private String role;

    @NotBlank
    @Pattern(regexp = "male|female|other", message = "Gender must be male, female, or other")
    private String gender;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Feedback> feedbackList;

    @OneToMany(mappedBy = "createdBy", cascade = CascadeType.ALL)
    private List<Event> eventList;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Volunteer> volunteerForms;


    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<UserMessage> userMessageList;


    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Performance> performances;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<FoodSeller> sellers;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private FoodBusiness business;

    public List<UserMessage> getUserMessageList() {
        return userMessageList;
    }

    public void setUserMessageList(List<UserMessage> userMessageList) {
        this.userMessageList = userMessageList;
    }

    public List<Volunteer> getVolunteerForms() {
        return volunteerForms;
    }

    public void setVolunteerForms(List<Volunteer> volunteerForms) {
        this.volunteerForms = volunteerForms;
    }

    public List<Event> getEventList() {
        return eventList;
    }

    public void setEventList(List<Event> eventList) {
        this.eventList = eventList;
    }


    public List<Feedback> getFeedbackList() {
        return feedbackList;
    }

    public void setFeedbackList(List<Feedback> feedbackList) {
        this.feedbackList = feedbackList;
    }

    // Constructors
    public User() {}

    public User(String name, String tnt, String email, String hashedPassword, String role, String gender) {
        this.name = name;
        this.tnt = tnt;
        this.email = email;
        this.hashedPassword = hashedPassword;
        this.role = role;
        this.gender = gender;
    }

    // Getters and Setters

    public Long getId() { return id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getTnt() { return tnt; }
    public void setTnt(String tnt) { this.tnt = tnt; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getHashedPassword() { return hashedPassword; }
    public void setHashedPassword(String hashedPassword) { this.hashedPassword = hashedPassword; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public List<Performance> getPerformances() {
        return performances;
    }

    public void setPerformances(List<Performance> performances) {
        this.performances = performances;
    }

    public List<FoodSeller> getSellers() {
        return sellers;
    }

    public void setSellers(List<FoodSeller> sellers) {
        this.sellers = sellers;
    }

    public FoodBusiness getBusiness() {
        return business;
    }

    public void setBusiness(FoodBusiness business) {
        this.business = business;
    }

}
