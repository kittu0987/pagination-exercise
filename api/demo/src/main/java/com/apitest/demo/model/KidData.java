package com.apitest.demo.model;
import jakarta.persistence.*;


@Entity
@Table(name = "kid_data")
public class KidData {

    @Id  // Primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String kidProfilePath;
    private String kidName;
    private int fileId;
    private String school;
    private int likes;
    private String filename;

    public String getKidProfilePath() {
        return kidProfilePath;
    }

    public void setKidProfilePath(String kidProfilePath) {
        this.kidProfilePath = kidProfilePath;
    }

    public String getKidName() {
        return kidName;
    }

    public void setKidName(String kidName) {
        this.kidName = kidName;
    }

    public int getFileId() {
        return fileId;
    }

    public void setFileId(int fileId) {
        this.fileId = fileId;
    }

    public String getSchool() {
        return school;
    }

    public void setSchool(String school) {
        this.school = school;
    }

    public int getLikes() {
        return likes;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}

