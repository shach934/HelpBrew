package se.kth.sda.skeleton.reactions;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import se.kth.sda.skeleton.auth.AuthService;
import se.kth.sda.skeleton.comments.Comment;
import se.kth.sda.skeleton.comments.CommentService;
import se.kth.sda.skeleton.post.Post;
import se.kth.sda.skeleton.post.PostService;
import se.kth.sda.skeleton.user.User;
import se.kth.sda.skeleton.user.UserService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/reactions")
public class ReactionController {

    @Autowired
    ReactionService reactionService;

    @Autowired
    AuthService authService;

    @Autowired
    UserService userService;

    @Autowired
    PostService postService;

    @Autowired
    CommentService commentService;

    /**
     * EndPoint that receives a request to get all the reaction.
     * @return Invoke the getAll function in the reactionService class.
     * List of all reactions.
     */
    @GetMapping("")
    public List<Reaction> getAll() {
        return reactionService.getAll();
    }

    /**
     * EndPoint that receives a specific id and send it to the reactionService.
     * @param id
     * @return Invoke the getById function in the reactionService class.
     * The reaction with specific id.
     */
    @GetMapping("/{id}")
    public Reaction getById(@PathVariable long id) {
        return reactionService.getById(id);
    }

    @GetMapping("/{postId}")
    public int getAllByPostId(@PathVariable Long postId, @RequestParam String type){
        List<Reaction> allReactions = reactionService.getAllByPostId(postId);
        int counter = 0;
        for(Reaction r:allReactions){
            if(r.getType().equals(type)){
                counter += 1;
            }
        }
        return counter;
    }

    @GetMapping("/{commentId}")
    public int getAllByCommentId(@PathVariable Long commentId, @RequestParam String type){
        List<Reaction> allReactions = reactionService.getAllByPostId(commentId);
        int counter = 0;
        for(Reaction r:allReactions){
            if(r.getType().equals(type)){
                counter += 1;
            }
        }
        return counter;
    }

    @GetMapping("/{userId}")
    public int getAllByUserId(@PathVariable Long userId, @RequestParam String type){
        List<Reaction> allReactions = reactionService.getAllByPostId(userId);
        int counter = 0;
        for(Reaction r:allReactions){
            if(r.getType().equals(type)){
                counter += 1;
            }
        }
        return counter;
    }

    @PostMapping("{postId}")
    public void createPostReaction(@PathVariable Long postId, @RequestParam String type){
        //pass a postId and type in, then check if this is a new, change, cancel operation.
        List<Reaction> postReactions = reactionService.getAllByPostId(postId);
        String loggedUserEmail = authService.getLoggedInUserEmail();

        for(Reaction reaction:postReactions){
            // loop over all reaction to check if user has reacted before.
            if(reaction.getUser().getEmail().equals(loggedUserEmail)){
                if(reaction.getType().equals(type)){
                    // same type, just delete it.
                    Long reactionId = reaction.getId();
                    delete(reactionId);
                }else {
                    // different type, reset the type to current type and break the loop.
                    reaction.setType(type);
                }
                return;
            }
        }

        Reaction reaction = new Reaction();
        Post post = postService.getById(postId);
        reaction.setPost(post);
        User user = userService.findUserByEmail(loggedUserEmail);
        reaction.setUser(user);
        reactionService.create(reaction);
    }

    @PostMapping("{commentId}")
    public void createCommentReaction(@PathVariable Long commentId, @RequestParam String type){
        List<Reaction> commentReactions = reactionService.getAllByCommentId(commentId);
        String loggedUserEmail = authService.getLoggedInUserEmail();

        for(Reaction reaction:commentReactions){
            if(reaction.getUser().getEmail().equals(loggedUserEmail)){
                if(reaction.getType().equals(type)){
                    Long reactionId = reaction.getId();
                    delete(reactionId);
                }else {
                    reaction.setType(type);
                }
                return;
            }
        }
        Reaction reaction = new Reaction();
        Comment comment = commentService.getById(commentId);
        reaction.setComment(comment);
        User user = userService.findUserByEmail(loggedUserEmail);
        reaction.setUser(user);
        reactionService.create(reaction);
    }

    public void delete(Long id) {
        reactionService.delete(id);
    }
}