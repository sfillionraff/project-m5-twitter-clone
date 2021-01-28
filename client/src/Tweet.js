import {useHistory} from "react-router-dom";
import styled from "styled-components";
import Moment from 'moment';

import TweetBar from './TweetBar';
import Error from './ErrorPage';
import { colors } from "./GlobalStyles";
import { AiOutlineRetweet } from "react-icons/ai";
import { BsDot } from "react-icons/bs";

const Tweet = ({ tweet }) => {
    // author is an object, media is an array, status is the tweet content

    const {
        author, 
        id, 
        retweetFrom,
        media,
        status,
        timestamp
        } = tweet;

    const date = Moment(timestamp).format("MMM Do");
    
    const history = useHistory();

    function tweetClickFunction(id) {
        fetch(`/api/tweet/${id}`)
            .then((res) => res.json())
            .then((response) => {
                history.push(`/tweet/${id}`);
            })
            .catch((error) => {
                return (
                    <Error />
                )
            })
    }

    function userClickFunction(e) {
        e.stopPropagation();
        history.push(`/${author.handle}`);
    }

    const handleEnterkey = (e, id) => {
        if (e.key === "Enter") {
            history.push(`/tweet/${id}`);
        }
    }
    
    return (
        <TweetContainer
            key={id}
            onClick={() => tweetClickFunction(tweet.id)}
            onKeyDown={handleEnterkey(id)}
            tabIndex="0"
            aria-label="tweet"
        >
            {tweet.retweetFrom &&
                <RetweetContainer>
                    <RetweetSymbol />
                    <RetweetText>{tweet.retweetFrom.displayName} Remeowed</RetweetText>
                </RetweetContainer>
            }
            <TweetTop>
                <UserAvatar src={author.avatarSrc} alt="user avatar" />
                <UserDisplayName
                    onClick={userClickFunction}
                    tabIndex="0"
                    aria-label="display name"
                    >
                        {author.displayName}
                </UserDisplayName>
                <UserHandle>@{author.handle}</UserHandle>
                <Dot />
                <DateText>{date}</DateText>
            </TweetTop>
            <div>
                <TweetContent>{status}</TweetContent>
                {tweet.media.length !== 0
                ? <Image src={media[0].url} alt="tweet media" />
                : ""
                }
            </div>
            <TweetBar retweetFrom={retweetFrom}/>
        </TweetContainer>
    )
};

const TweetContainer = styled.div`
    position: relative; 
    left: 0;
    width: 650px;
    max-height: 500px;
    padding: 10px;
    border-bottom: 1px solid ${colors.gray};
    margin: 3px;

    &:hover {
        cursor: pointer;
    }

    &:focus {
        border: 2px solid blue;
    }
`;

const RetweetContainer = styled.div`
    display: flex;
    align-items: baseline;
    width: 250px;
    height: 30px;
`;

const RetweetSymbol = styled(AiOutlineRetweet)`
    width: 15px;
    height: 15px;
    padding: 0 5px;
`;

const RetweetText = styled.p`
    font-size: 12px;
    color: gray;
    padding: 0 5px;
`;

const TweetTop = styled.div`
    display: flex;
    align-items: baseline;
    max-height: 60px;
`;

const UserAvatar = styled.img`
    border-radius: 50%;
    width: 40px;
    height: 40px;
    padding: 5px;
    align-self: center;
`;

const UserDisplayName = styled.h1`
    font-size: 12pt;
    padding: 5px;
`;

const UserHandle = styled.p`
    color: gray;
    padding: 5px;
`;

const Dot = styled(BsDot)`
    color: gray;
`;

const DateText = styled.p`
    color: gray;
`;

const TweetContent = styled.p`
    font-weight: normal;
    font-size: 14px;
    position: relative;
    left: 5%;
    max-width: 575px;
    margin-top: 0;
`;

const Image = styled.img`
    width: 75%;
    height: 350px;
    border-radius: 10px;
    position: relative;
    left: 5%;
`;


export default Tweet;