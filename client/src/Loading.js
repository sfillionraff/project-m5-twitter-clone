import styled, { keyframes } from "styled-components";

import { FaSpinner } from "react-icons/fa";

const Loading = () => {

    return (
        <Loader />
    )
}

const animation = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

const Loader = styled(FaSpinner)`
    width: 50px;
    height: 50px;
    position: absolute;
    top: 25%;
    left: 50%;
    animation: ${animation} 1s;
    animation-iteration-count: 10;
`;

export default Loading;
