package com.codecool.tauschcool.repository;

import com.codecool.tauschcool.model.Role;
import com.codecool.tauschcool.model.RoleType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByType(RoleType roleType);
}