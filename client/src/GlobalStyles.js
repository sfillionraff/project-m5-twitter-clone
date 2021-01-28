import { createGlobalStyle } from "styled-components";

export const colors = {
    purple: "hsl(258deg, 100%, 50%)",
    gray: "#e6e6e6",
};

export default createGlobalStyle`
    html, body, div,
    input, button, select, option,
    h1, h2, h3, h4, h5, h6, p,
    text {
        font-family: sans-serif;
    }
    body {
        max-width: 100vh;
    }
`;