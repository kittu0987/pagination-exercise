package com.apitest.demo.repository;

import com.apitest.demo.model.KidData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KidDataRepository extends JpaRepository<KidData,Long> {

}
