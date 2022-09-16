package com.server.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;
import java.io.Serializable;

@Data
@Entity
@Table(name="comment",schema = "backend")

//因为jpa在映射实体是需要一个id，使用联合主键
@IdClass(Comment.class)

public class Comment implements Serializable {

    @Id
    private Integer productId;

    @Id
    private Integer userId;

    private Integer rate;

    private String content;
}
