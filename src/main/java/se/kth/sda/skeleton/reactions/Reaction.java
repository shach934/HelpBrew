package se.kth.sda.skeleton.reactions;

import se.kth.sda.skeleton.comments.Comment;
import se.kth.sda.skeleton.post.Post;
import se.kth.sda.skeleton.user.User;

import javax.persistence.*;
import java.util.*;

/**
 * this class is taking care of creating the reaction table
 * in postgresql dataBase using spring annotations.
 */

@Entity
public class Reaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Determining the relation between reaction and post entities.
     * one post can have many reaction from different users
     */
    @ManyToOne
    private Post post;
    @ManyToOne
    private Comment comment;
    @ManyToOne
    private User user;

    private String type;  // type can be like or dislike.

    public Reaction(){ }

    public Reaction(Long id, Post post, Comment comment, User user, String type) {
        this.id = id;
        this.post = post;
        this.comment = comment;
        this.user = user;
        this.type = type;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    public Comment getComment() {
        return comment;
    }

    public void setComment(Comment comment) {
        this.comment = comment;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
