import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Moment from 'moment';

import Tweet from './Tweet';
import Error from './ErrorPage';
import Loader from './Loading';
import { IoLocationOutline } from 'react-icons/io5';
import { AiOutlineCalendar } from 'react-icons/ai';
import { colors } from './GlobalStyles';

const Profile = () => {
    const {handle} = useParams();
    const [profile, setProfile] = useState();
    const [userTweetFeed, setUserTweetFeed] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!profile) {
            fetch(`/api/${handle}/profile`)
            .then((res) => res.json())
            .then((response) => {
                setProfile(response.profile);
            })
            .catch((error) => {
                <Error />
            })
        };
    });

    useEffect(() => {
        if (!userTweetFeed) {
            fetch(`/api/${handle}/feed`)
            .then((res) => res.json())
            .then((response) => {
                setUserTweetFeed(response);
            })
            .catch((error) => {
                <Error />
            })
        };
    })

    useEffect(() => {
        if(profile && loading) {
            setLoading(false);
        }
    }, [profile]);

    if(loading) {
        return (
            <Loader />
        )
    } else {
        return (
            <ProfileContainer>
                <ProfileInfoContainer>
                    <div>
                        <Banner src={profile.bannerSrc} alt="profile banner" />
                        <Avatar src={profile.avatarSrc} alt="profile avatar" />
                    </div>
                    {profile.isBeingFollowedByYou
                        ?<Following>Following</Following>
                        : null
                    }
                    <Wrapper>
                        <DisplayName>{profile.displayName}</DisplayName>
                        <HandleSpan>
                            <Handle>@{profile.handle}</Handle>
                            {profile.isFollowingYou
                                ?<FollowingYou>Following You</FollowingYou>
                                : null
                            }
                        </HandleSpan>
                        <p>{profile.bio}</p>
                    </Wrapper>
                    <UserInfoContainer>
                        <SpanOne><IoLocationOutline /><UserInfo>{profile.location}</UserInfo></SpanOne>
                        <SpanTwo><AiOutlineCalendar /><UserInfo>Joined {Moment(profile.joined).format('MMMM YYYY')}</UserInfo></SpanTwo>
                    </UserInfoContainer>
                    <UserInfoContainer>
                        <SpanOne><FollowingP><BoldSpan>{profile.numFollowing}</BoldSpan> Following</FollowingP></SpanOne>
                        <SpanTwo><FollowingP><BoldSpan>{profile.numFollowers}</BoldSpan> Followers</FollowingP></SpanTwo>
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
};

const ProfileContainer = styled.div`
    position: absolute;
    left: 25%;
    top: 2%;
    border-left: 1px solid ${colors.gray};
    border-right: 1px solid ${colors.gray};
`;

const ProfileInfoContainer = styled.div`
    position: relative;
`;

const Banner = styled.img`
    width: 100%;
    height: 200px;
    position: relative;
    top: 0;
`;

const Avatar = styled.img`
    border-radius: 50%;
    position: relative;
    /* right: 85%;
    top: 10px; */
    width: 100px;
    height: 100px;
    border: 1px solid white;
    bottom: 40px;
`;

const Following = styled.span`
    background-color: ${colors.purple};
    color: white;
    width: 100px;
    border-radius: 12px;
    padding: 5px;
    font-weight: bold;
    text-align: center;
    position: absolute;
    left: 500px;
    top: 220px;
`;

const Wrapper = styled.div`
    position: relative;
    left: 5px;
    max-width: 500px;
    bottom: 25px;
`;

const DisplayName = styled.h1`
    font-size: 16pt;
`;

const HandleSpan = styled.span`
    display: flex;
    padding: 2px;
`;

const Handle = styled.h2`
    color: gray;
    font-size: 12pt;
    font-weight: normal;
    margin-top: 0;
`;

const FollowingYou = styled.span`
    background-color: ${colors.gray};
    border-radius: 12px;
    height: 25px;
    margin-left: 10px;
`;

const UserInfoContainer = styled.div`
    display: flex;
    position: relative;
    bottom: 25px;
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
`;

const UserInfo = styled.p`
    color: gray;
    font-size: 14pt;
    margin-left: 5px;
`;

const BoldSpan = styled.span`
    font-weight: bold;
    font-size: 14pt;
`;

const FollowingP = styled.p`
    color: gray;
    font-size: 14pt;
`;

const ButtonContainer = styled.div`
    width: 700px;
    display: flex;
    border-bottom: 2px solid ${colors.gray};
`;

const Button = styled.button`
    font-size: 16pt;
    font-family: sans-serif;
    width: 230px;
    border-style: none;
    text-align: center;
    background-color: white;

    &:active {
        color: ${colors.purple};
        border-bottom: ${colors.purple};
    }
`;

export default Profile;

// currentUser:
    // avatarSrc: "/assets/treasurymog-avatar.jpg"
    // bannerSrc: "/assets/treasurymog-banner.jpeg"
    // bio: "I live and work at the Treasury as a mouser but I also have a paw in the finances. Here to help lighten up the political world. Unofficial."
    // displayName: "Gladstone, Esq."
    // handle: "treasurymog"
    // isBeingFollowedByYou: false
    // isFollowingYou: false
    // joined: "2016-10-12T12:00"
    // location: "Whitehall, London"
    // numFollowers: 2
    // numFollowing: 2
    // numLikes: 1

    /* &:active {
        border-bottom: 2px solid ${colors.purple};
    } */