package com.okta.developer.jugtours.service;

import com.okta.developer.jugtours.model.Group;
import com.okta.developer.jugtours.repository.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;

@org.springframework.stereotype.Service
public class GroupServiceImpl extends AbstractService<Group, Long, GroupRepository> {

    private final
    GroupRepository groupRepository;

    @Autowired
    protected GroupServiceImpl(GroupRepository repository) {
        super(repository);
        this.groupRepository = repository;
    }

    public Group findByName(String name) {
        return groupRepository.findByName(name);
    }
}
