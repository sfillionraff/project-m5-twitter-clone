import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import Moment from 'moment';

import Tweet from './Tweet';
import {CurrentUserContext} from './CurrentUserContext';
import { colors } from "./GlobalStyles";
import { IoLocationOutline } from 'react-icons/io5';
import { AiOutlineCalendar } from 'react-icons/ai';

const Profile = () => {
    const {currentUser} = useContext(CurrentUserContext);
    const [userTweetFeed, setUserTweetFeed] = useState();

    useEffect(() => {
        fetch(`/api/${currentUser.handle}/feed`)
        .then((res) => res.json())
        .then((response) => setUserTweetFeed(response));
    })

    const dateJoined = Moment(currentUser.joined).format('MMMM YYYY');

    return (
        <ProfileContainer>
            <ProfileInfoContainer>
                <div>
                    <Banner src={currentUser.bannerSrc} alt="profile banner" />
                    <Avatar src={currentUser.avatarSrc} alt="profile avatar" />
                </div>
                <Wrapper>
                    <DisplayName>{currentUser.displayName}</DisplayName>
                    <Handle>@{currentUser.handle}</Handle>
                    <p>{currentUser.bio}</p>
                </Wrapper>
                <UserInfoContainer>
                    <SpanOne><IoLocationOutline /><p>{currentUser.location}</p></SpanOne>
                    <SpanTwo><AiOutlineCalendar /><p>Joined {dateJoined}</p></SpanTwo>
                </UserInfoContainer>
                <UserInfoContainer>
                    <SpanOne><p><BoldSpan>{currentUser.numFollowing}</BoldSpan>Following</p></SpanOne>
                    <SpanTwo><p><BoldSpan>{currentUser.numFollowers}</BoldSpan>Followers</p></SpanTwo>
                </UserInfoContainer>
                <ButtonContainer>
                        <Button>Tweet</Button>
                        <Button>Media</Button>
                        <Button>Likes</Button>
                </ButtonContainer>
            </ProfileInfoContainer>
            <div>
                {userTweetFeed && userTweetFeed.tweetIds.map((tweetId) => {
                    return (
                        <Tweet tweet={userTweetFeed.tweetsById[tweetId]}
                        />
                    )
                })}
            </div>
        </ProfileContainer>
    )
}

const ProfileContainer = styled.div`
    position: absolute;
    left: 25%;
    top: 2%;
    border-left: 1px solid gray;
`;

const ProfileInfoContainer = styled.div`
    position: relative;
`;

const Banner = styled.img`
    width: 600px;
    height: 200px;
    position: relative;
    top: 0;
`;

const Avatar = styled.img`
    border-radius: 50%;
    position: relative;
    right: 85%;
    top: 30%;
    width: 100px;
    height: 100px;
    border: 1px solid white;
`;

const Wrapper = styled.div`
    position: relative;
    left: 5px;
    max-width: 500px;
`;

const DisplayName = styled.h1`
    font-size: 16pt;
    margin-top: 5px;
`;

const Handle = styled.h2`
    color: gray;
    font-size: 12pt;
    font-weight: normal;
`;

const UserInfoContainer = styled.div`
    display: flex;
`;

const SpanOne = styled.span`
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
    padding: 5px;
    width: 200px;
`;

const SpanTwo = styled.span`
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
    padding: 5px;
    width: 200px;
`;

const BoldSpan = styled.span`
    font-weight: bold;
`;

const ButtonContainer = styled.div`
    width: 600px;
    display: flex;
`;

const Button = styled.button`
    font-size: 16pt;
    width: 200px;
    border-bottom: 2px solid ${colors.gray};
    text-align: center;

    &:active {
        color: ${colors.purple};
        border-bottom: 2px solid ${colors.purple};
    }
`

export default Profile;