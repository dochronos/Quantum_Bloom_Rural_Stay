package com.quantumbloom.backend.mapper;

import com.quantumbloom.backend.model.User;
import com.quantumbloom.backend.model.UserDTO;
import org.modelmapper.ModelMapper;

public class UserMapper {
    private static final ModelMapper modelMapper = new ModelMapper();

    public static User toEntity(UserDTO userDTO) {
        return modelMapper.map(userDTO, User.class);
    }
}
