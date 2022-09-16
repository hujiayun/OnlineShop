package com.server.mapper;

import com.server.entity.User;
import org.springframework.data.repository.CrudRepository;

//spring-data-jpa支持自定义简单函数，Respository会根据函数名，自动生成sql
//直接使用，无需实现函数体
//可以查看日志，生成的sql，类似：
//select * from user where name=?


public interface UserMapper extends CrudRepository<User, Integer> {

    public User findUserByUsername(String username);

}
