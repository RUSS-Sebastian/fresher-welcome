package com.example.fresherwelcome.model;

import jakarta.persistence.*;
import com.example.fresherwelcome.model.User;

import java.time.LocalDateTime;


@Entity
@Table(name = "volunteer")
public class Volunteer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "volunteer_id")
    private Long volunteerId;

    @Column(name = "telegram_username", nullable = false)
    private String telegramUsername;

    @Convert(converter = SemesterConverter.class)
    @Column(name = "current_semester", nullable = false)
    private Semester currentSemester;

    @Convert(converter = RoleConverter.class)
    @Column(name = "preferred_role", nullable = false)
    private Role preferredRole;


    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", nullable = false) // foreign key in volunteer table
    private User user;

    @Convert(converter = AvailabilityConverter.class)
    @Column(name = "availability", nullable = false)
    private Availability availability;

    @Column(name = "skills_experience", columnDefinition = "TEXT")
    private String skillsExperience;

    @Column(name = "reason", columnDefinition = "TEXT")
    private String reason;



    @Enumerated(EnumType.STRING)
    @Column(nullable = false,name = "is_volunteer")
    private VolunteerStatus isVolunteer = VolunteerStatus.PENDING; // default


    @Column(name = "submitted_time", nullable = false, updatable = false)
    private LocalDateTime submittedTime;


    public Volunteer(){
        this.submittedTime = LocalDateTime.now();
    }

    // --- Enums with labels ---


    public enum Semester {
        SEM_1("1 Sem"),
        SEM_2("2 Sem"),
        SEM_3("3 Sem"),
        SEM_4("4 Sem"),
        SEM_5("5 Sem"),
        SEM_6("6 Sem"),
        SEM_7("7 Sem"),
        SEM_8("8 Sem"),
        SEM_9("9 Sem"),
        SEM_10("10 Sem"),
        HIGHER("Higher");

        private final String label;

        Semester(String label) {
            this.label = label;
        }

        public String getLabel() {
            return label;
        }

        public static Semester fromLabel(String dbValue) {
            for (Semester s : values()) {
                if (s.label.equals(dbValue)) return s;
            }
            throw new IllegalArgumentException("Unknown semester: " + dbValue);
        }
    }

    public enum Role {
        PROGRAM_STAGE("Program & Stage"),
        LOGISTICS_SETUP("Logistics & Setup"),
        HOSPITALITY_RECEPTION("Hospitality & Reception"),
        FOOD_REFRESHMENTS("Food & Refreshments"),
        GAMES_ACTIVITY("Games & Activity"),
        MEDIA_DOCUMENTATION("Media & Documentation"),
        OTHER("Other");

        private final String label;

        Role(String label) {
            this.label = label;
        }

        public String getLabel() {
            return label;
        }

        public static Role fromLabel(String dbValue) {
            for (Role r : values()) {
                if (r.label.equals(dbValue)) return r;
            }
            throw new IllegalArgumentException("Unknown role: " + dbValue);
        }
    }

    public enum Availability {
        WEEKDAYS("Weekdays (Mon-Fri)"),
        WEEKENDS("Weekends (Sat-Sun)"),
        EVENINGS_ONLY("Evenings only"),
        MORNING_HOURS("Morning Hours"),
        FLEXIBLE_SCHEDULE("Flexible Schedule"),
        DURING_BREAKS_ONLY("During Breaks Only");

        private final String label;

        Availability(String label) {
            this.label = label;
        }

        public String getLabel() {
            return label;
        }

        public static Availability fromLabel(String dbValue) {
            for (Availability a : values()) {
                if (a.label.equals(dbValue)) return a;
            }
            throw new IllegalArgumentException("Unknown availability: " + dbValue);
        }
    }

    // --- Converters ---
    @Converter(autoApply = false)
    public static class SemesterConverter implements AttributeConverter<Semester, String> {
        @Override
        public String convertToDatabaseColumn(Semester attribute) {
            return attribute != null ? attribute.getLabel() : null;
        }
        @Override
        public Semester convertToEntityAttribute(String dbData) {
            return dbData != null ? Semester.fromLabel(dbData) : null;
        }
    }

    @Converter(autoApply = false)
    public static class RoleConverter implements AttributeConverter<Role, String> {
        @Override
        public String convertToDatabaseColumn(Role attribute) {
            return attribute != null ? attribute.getLabel() : null;
        }
        @Override
        public Role convertToEntityAttribute(String dbData) {
            return dbData != null ? Role.fromLabel(dbData) : null;
        }
    }

    @Converter(autoApply = false)
    public static class AvailabilityConverter implements AttributeConverter<Availability, String> {
        @Override
        public String convertToDatabaseColumn(Availability attribute) {
            return attribute != null ? attribute.getLabel() : null;
        }
        @Override
        public Availability convertToEntityAttribute(String dbData) {
            return dbData != null ? Availability.fromLabel(dbData) : null;
        }
    }

    // --- Getters & Setters ---


    // Getter & Setter
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getVolunteerId() {
        return volunteerId;
    }

    public void setVolunteerId(Long volunteerId) {
        this.volunteerId = volunteerId;
    }

    public String getTelegramUsername() {
        return telegramUsername;
    }

    public void setTelegramUsername(String telegramUsername) {
        this.telegramUsername = telegramUsername;
    }

    public Semester getCurrentSemester() {
        return currentSemester;
    }

    public void setCurrentSemester(Semester currentSemester) {
        this.currentSemester = currentSemester;
    }

    public Role getPreferredRole() {
        return preferredRole;
    }

    public void setPreferredRole(Role preferredRole) {
        this.preferredRole = preferredRole;
    }

    public Availability getAvailability() {
        return availability;
    }

    public void setAvailability(Availability availability) {
        this.availability = availability;
    }

    public String getSkillsExperience() {
        return skillsExperience;
    }

    public void setSkillsExperience(String skillsExperience) {
        this.skillsExperience = skillsExperience;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public VolunteerStatus getIsVolunteer() {
        return isVolunteer;
    }

    public void setIsVolunteer(VolunteerStatus isVolunteer) {
        this.isVolunteer = isVolunteer;
    }

    public LocalDateTime getSubmittedTime() {
        return submittedTime;
    }

    public void setSubmittedTime(LocalDateTime submittedTime) {
        this.submittedTime = submittedTime;
    }
}

