package se.kth.sda.skeleton.comments;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import se.kth.sda.skeleton.post.Post;
import se.kth.sda.skeleton.reactions.Reaction;

import java.util.List;

@Table(name = "comments")
@Entity
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "body")
    private String body;

    @Column(name = "author_name")
    private String authorName;

    @ManyToOne
    private Post post;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "post")
    private List<Reaction> reactions;

    public Comment(){}

    public Comment(Long id, String body, String authorName, Reaction reaction) {
        this.id = id;
        this.body = body;
        this.authorName = authorName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }

}
