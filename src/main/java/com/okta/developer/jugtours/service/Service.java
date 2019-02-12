package com.okta.developer.jugtours.service;

import java.util.List;
import java.util.Optional;

public interface Service<T, ID> {

    T save(T entity);

    void deleteById(ID id);

    List<T> findAll();

    T getOne(ID id);

    T editEntity(T entity);

    Optional<T> findById(ID id);
}