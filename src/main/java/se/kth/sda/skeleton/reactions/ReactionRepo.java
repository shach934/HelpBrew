package se.kth.sda.skeleton.reactions;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReactionRepo extends JpaRepository<Reaction, Long> {
    List<Reaction> findAllByPostId(Long postId);
    List<Reaction> findAllByCommentId(Long commentId);
    List<Reaction> findAllByUserId(Long userId);
    List<Reaction> findByPostIdAndType(Long postId, String type);
    List<Reaction> findByCommentIdAndType(Long commentId, String type);
    List<Reaction> findByUserIdAndType(Long UserId, String type);
}
