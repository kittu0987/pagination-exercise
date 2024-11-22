package com.apitest.demo.controller;

import com.apitest.demo.model.KidData;
import com.apitest.demo.repository.KidDataRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://127.0.0.1:3000") // Allow frontend to make requests from localhost:3000
@RequestMapping("api/kids")
public class KidDataController {

    @Autowired
    private KidDataRepository kidDataRepository;

    @GetMapping
    public ResponseEntity<Page<KidData>> getAllKids(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "5") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<KidData> kidsPage = kidDataRepository.findAll(pageable);
        return ResponseEntity.ok(kidsPage);
    }

    // other methods...
    @PostMapping
    public ResponseEntity<String> addKidData(@RequestBody KidData kidData) {
        kidDataRepository.save(kidData);
        return ResponseEntity.status(HttpStatus.CREATED).body("Kid data added successfully!");
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateKidData(@PathVariable Long id, @RequestBody KidData updatedData) {
        Optional<KidData> optionalKidData = kidDataRepository.findById(id);
        if (optionalKidData.isPresent()) {
            KidData existingKidData = optionalKidData.get();
            existingKidData.setKidProfilePath(updatedData.getKidProfilePath());
            existingKidData.setKidName(updatedData.getKidName());
            existingKidData.setFileId(updatedData.getFileId());
            existingKidData.setSchool(updatedData.getSchool());
            existingKidData.setLikes(updatedData.getLikes());
            existingKidData.setFilename(updatedData.getFilename());
            kidDataRepository.save(existingKidData);
            return ResponseEntity.ok("Kid data updated successfully!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Kid data with ID " + id + " not found.");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteKidData(@PathVariable Long id) {
        if (kidDataRepository.existsById(id)) {
            kidDataRepository.deleteById(id);
            return ResponseEntity.ok("Kid data deleted successfully!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Kid data with ID " + id + " not found.");
        }
    }
}

