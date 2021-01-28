import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Moment from 'moment';

import TweetBar from './TweetBar.js';
import Loader from './Loading';
import Error from './ErrorPage';
import { colors } from "./GlobalStyles";
import { BsDot } from "react-icons/bs";

const TweetDetails = () => {
    const {tweetId} = useParams();
    const [tweetInfo, setTweetInfo] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!tweetInfo) {
            fetch(`/api/tweet/${tweetId}`)
            .then((res) => res.json())
            .then((response) => {
                setTweetInfo(response.tweet);
            })
            .catch((error) => {
                <Error />
            })
        }
    }, []);
    
    useEffect(() => {
        if(tweetInfo && loading) {
            setLoading(false);
        }
    }, [tweetInfo]);

    console.log(tweetInfo);

    return (
        <>
            {loading && !tweetInfo
            ? <Loader />
            :
            <>
                <TweetContainer id={tweetInfo.id} tabIndex="0">
                    <TweetTop>
                        <UserAvatar src={tweetInfo.author.avatarSrc} alt="user avatar" />
                        <UserContainer>
                            <UserDisplayName>{tweetInfo.author.displayName}</UserDisplayName>
                            <UserHandle>@{tweetInfo.author.handle}</UserHandle>
                        </UserContainer>
                    </TweetTop>
                    <div>
                        <Tweet>{tweetInfo.status}</Tweet>
                        {tweetInfo.media.length !== 0
                        ? <Image src={tweetInfo.media[0].url} alt="tweet media" />
                        : ""
                        }
                    </div>
                    <DateContainer>
                        <p>{Moment(tweetInfo.timestamp).format("h:mm A")}</p>
                        <BsDot />
                        <p>{Moment(tweetInfo.timestamp).format("MMM D YYYY")}</p>
                    </DateContainer>
                    <TweetBarDiv>
                        <TweetBar />
                    </TweetBarDiv>
                </TweetContainer>
            </>
            }
        </>
    )
};

const TweetContainer = styled.div`
    position: absolute;
    top: 2%;
    left: 25%;
    border-left: 2px solid ${colors.gray};
    border-right: 2px solid ${colors.gray};
    border-bottom: 2px solid ${colors.gray};
    width: 700px;
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

const UserContainer = styled.span`
    display: flex;
    align-items: baseline;
    flex-direction: column;
    padding: 5px;
`;

const UserDisplayName = styled.h1`
    font-size: 12pt;
    display: block;
    margin-bottom: 0;
`;

const UserHandle = styled.p`
    color: gray;
    display: block;
    margin-top: 0;
`;

const Tweet = styled.h2`
    font-weight: normal;
    font-size: 16pt;
    position: relative;
    left: 5%;
    max-width: 575px;
    margin-top: 10px;
`;

const Image = styled.img`
    width: 600px;
    height: 450px;
    border-radius: 10px;
    position: relative;
    left: 5%;
`;

const DateContainer = styled.div`
    color: gray;
    display: flex;
    align-items: baseline;
    position: relative;
    left: 5%;
`;

const TweetBarDiv = styled.div`
    position: relative;
    left: 10%;
`;

export default TweetDetails;