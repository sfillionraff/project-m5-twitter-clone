import { useState } from "react";
import styled from "styled-components";

import { BiMessageRounded } from "react-icons/bi";
import { AiOutlineRetweet, AiOutlineHeart } from "react-icons/ai";
import { FiShare } from "react-icons/fi";

const TweetBar = ({retweetFrom}) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    function likeTweetFunction(e) {
        e.stopPropagation();
        if (!isLiked) {
            setIsLiked(true);
            setLikeCount(likeCount + 1);
        }
        else {
            setIsLiked(false);
            setLikeCount(likeCount - 1);
        }
    }

    return (
        <Wrapper aria-label="tweet actions">
            <CommentButton
                tabIndex="0"
                aria-label="comment"
            />
            {retweetFrom
            ?  <>
                    <RetweetButton tabIndex="0" style={{color:"green"}} aria-label="retweet"/>
                    <RetweetCounter>1</RetweetCounter>
                </>
            : <RetweetButton tabIndex="0" />
            }
            <LikeButton
                tabIndex="0"
                color={isLiked ? "rgb(224, 36, 94)" : null}
                aria-label="like"
                onClick={e => likeTweetFunction(e)}
            />
            {isLiked && <LikeCounter>{likeCount}</LikeCounter>}
            <ShareButton tabIndex="0" aria-label="share"/>
        </Wrapper>
    )
};

const Wrapper = styled.div`
    width: 600px;
    height: 50px;
    display: flex;
    justify-content: space-around;
    position: relative;
    top: 15px;
`;

const CommentButton = styled(BiMessageRounded)`
    width: 20px;
    height: 20px;
    padding: 10 0 0;
`;

const RetweetButton = styled(AiOutlineRetweet)`
    width: 20px;
    height: 20px;
    padding: 10 0 0;
`;

const RetweetCounter = styled.p`
    margin: 0;
    position: absolute;
    right: 56%;
`;

const LikeButton = styled(AiOutlineHeart)`
    width: 20px;
    height: 20px;
    padding: 10 0 0;
`;

const LikeCounter = styled.p`
    margin: 0;
    position: absolute;
    right: 30%;
`;

const ShareButton = styled(FiShare)`
    width: 20px;
    height: 20px;
    padding: 10 0 0;
`;

// how to add hover effct to like button??

export default TweetBar;
