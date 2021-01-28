import styled from "styled-components";
import { FaBomb } from 'react-icons/fa';

const Error = () => {
    return (
        <Container>
            <Bomb />
            <h1>An unknown error has occurred</h1>
            <p>Please refresh the page or contact support if the problem persists</p>
        </Container>
    )
}

const Container = styled.div`
    position: absolute;
    top: 5%;
    left: 35%;
`;

const Bomb = styled(FaBomb)`
    width: 40px;
    height: 40px;
    display: block;
    margin-left: auto;
    margin-right: auto;
`;

export default Error;