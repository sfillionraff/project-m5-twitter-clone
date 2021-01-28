import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import Tweet from "./Tweet";
import TweetAction from "./TweetAction";
import Loader from './Loading';
import Error from './ErrorPage';
import { colors } from "./GlobalStyles";

const HomeFeed = () => {
    const [loading, setLoading] = useState(true);
    const [tweetInfo, setTweetInfo] = useState();

    // const startingRef = useRef(null);
    
    useEffect(() => {
        if(!tweetInfo){
            fetch(`/api/me/home-feed`)
            .then((res) => res.json())
            .then((response) => {
                setTweetInfo(response);
            })
            .catch((error) => {
                <Error />
            })
        }
    }, []);
        
    useEffect(()=> {
        if(tweetInfo && loading){
            setLoading(false);
        }
    }, [tweetInfo])
    
    if(loading){
        return (
            <Loader />
            )
    } else {
        return (
            <HomePageContainer>
                <HomeHeading>Home</HomeHeading>
                <TweetAction />
                {tweetInfo && tweetInfo.tweetIds.map((tweetId) => {
                    return (
                        <Tweet
                            tweet={tweetInfo.tweetsById[tweetId]} 
                        />
                    )
                })}
            </HomePageContainer>
        )
    }
};

const HomePageContainer = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    left: 25%;
    top: 5px;
    width: 675px;
    border-right: 1px solid ${colors.gray};
    border-left: 1px solid ${colors.gray};
`;

const HomeHeading = styled.h1`
    width: 600px;
    margin-left: 5px;
`;

export default HomeFeed;