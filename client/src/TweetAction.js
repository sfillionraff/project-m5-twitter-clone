import { useState, useContext } from "react";
import styled from "styled-components";

import { colors } from "./GlobalStyles";
import { CurrentUserContext } from './CurrentUserContext';

const TweetAction = () => {
    const [tweet, setTweet] = useState();
    const [characterCount, setCharacterCount] = useState(280);
    const [characterColor, setCharacterColor] = useState("gray");
    const [isDisabled, setIsDisabled] = useState(false);
    const {currentUser} = useContext(CurrentUserContext);

    const tweetActionFunction = (e) => {
        let text = e.target.value;
        setCharacterCount(280 - text.length);
        setTweet(text);
        if (characterCount > 0 && characterCount < 56) {
            setCharacterColor("yellow");
            setIsDisabled(false);
        } else if (characterCount < 0) {
            setCharacterColor("red");
            setIsDisabled(true);
        } else if (characterCount > 56) {
            setCharacterColor("gray");
            setIsDisabled(false);
        }
    };

    const handleEnterkey = (e) => {
        if (e.keyCode === 13) {
            postTweet();
        }
    }

    const postTweet = () => {
        fetch('/api/tweet', {
            method: 'POST',
            body: JSON.stringify({status: tweet}),
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json",
            }
        })
        .catch((error) => {
            window.alert("Unable to post tweet. Please try again later");
        })
    }

    return (
        <TweetActionContainer tabIndex="0">
            <Form>
                <Avatar src={currentUser.avatarSrc} alt="user avatar" />
                <Textarea
                    type="text"
                    placeholder="What's happening?"
                    maxlength="280"
                    onChange={tweetActionFunction}
                    aria-label="write a tweet"
                    tabIndex="0"/>
                <Container>
                    <CharacterCounter
                        style={{color: characterColor}}
                    >
                        {characterCount}
                    </CharacterCounter>
                    <Button
                        type="submit"
                        value="Meow" 
                        onClick={() => postTweet()}
                        onKeyDown={handleEnterkey}
                        aria-label="send tweet"
                        disabled={isDisabled}
                        tabIndex="0"
                    />
                </Container>
            </Form>
        </TweetActionContainer>
    )
};

const TweetActionContainer = styled.div`
    width: 675px;
    height: 200px;
    border-bottom: 5px solid ${colors.gray};
`;

const Form = styled.form`
    width: 600px;
    height: 200px;
    position: relative;
`;

const Avatar = styled.img`
    border-radius: 50%;
    position: absolute;
    left: 2%;
    width: 50px;
    height: 50px;
`;

const Textarea = styled.textarea`
    width: 500px;
    height: 175px;
    position: absolute;
    left: 15%;
    border: none;
    overflow: none;
    outline: none;
    box-shadow: none;
    resize: none;
    font-size: 18pt;
    font-family: sans-serif;

    &::placeholder {
        font-size: 18pt;
        font-family: sans-serif;
    }
`;

const Container = styled.div`
    position: absolute;
    display: flex;
    justify-content: space-around;
    width: 100px;
    top: 140px;
    left: 90%;
`;

const CharacterCounter = styled.p`
    padding: 10px;
`;

const Button = styled.input`
    background-color: ${colors.purple};
    color: white;
    border-radius: 40%;
    padding: 10px;
    margin: auto;
    border: none;
    font-weight: bold;
    font-size: 12pt;

    &:disabled {
        cursor: not-allowed;
        background-color: ${colors.gray};
    }

    &:hover {
        cursor: pointer;
    }
`;

export default TweetAction;