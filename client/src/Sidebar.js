import { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { CurrentUserContext } from './CurrentUserContext';
import { ReactComponent as Logo } from "./logo.svg";
import { FiBell, FiBookmark, FiHome, FiUser } from "react-icons/fi";
import { colors } from "./GlobalStyles";

const Sidebar = () => {
    let size = 25;
    let activeColor = colors.purple;
    const {currentUser} = useContext(CurrentUserContext);;
    
    return (
        <Wrapper>
            <Logo />
            <MenuContainer>
                <ListItem>
                    <FiHome
                        style={{width: size, height: size}}
                    />
                    <StyledNavLink to="/"
                        activeStyle={{color: activeColor}}
                        aria-label="link to homepage"
                        tabIndex="0"
                    >&nbsp;&nbsp;&nbsp;Home</StyledNavLink>
                </ListItem>
                <ListItem>
                    <FiUser
                        style={{width: size, height: size}}
                    />
                    <StyledNavLink to={`/${currentUser.handle}`}
                        activeStyle={{color: activeColor}}
                        aria-label="link to user profile"
                        tabIndex="0"
                    >&nbsp;&nbsp;&nbsp;Profile</StyledNavLink>
                </ListItem>
                <ListItem>
                    <FiBell
                        style={{width: size, height: size}}
                    />
                    <StyledNavLink to="/notifications"
                        activeStyle={{color: activeColor}}
                        aria-label="link to notifications"
                        tabIndex="0"
                    >&nbsp;&nbsp;&nbsp;Notifications</StyledNavLink>
                </ListItem>
                <ListItem>
                    <FiBookmark
                        style={{width: size, height: size}}
                    />
                    <StyledNavLink to="/bookmarks"
                        activeStyle={{color: activeColor}}
                        aria-label="link to bookmarks"
                        tabIndex="0"
                    >&nbsp;&nbsp;&nbsp;Bookmarks</StyledNavLink>
                </ListItem>
                <ListItem>
                    <Button aria-label="meow button" tabIndex="0">Meow</Button>
                </ListItem>
            </MenuContainer>
        </Wrapper>
    )
};

const Wrapper = styled.div`
    position: relative;
    left: 5%;
    top: 30%;
    width: 250px;
`;

const MenuContainer = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: baseline;
`;

const ListItem = styled.li`
    list-style: none;
    padding: 20px 0px;

    &:hover {
        background-color: #cc99ff;
        max-width: 185px;
        border-radius: 12px;
    }
`;

const StyledNavLink = styled(NavLink)`
    text-decoration: none;
    color: black;
    font-size: 18pt;
    font-weight: bold;
`;

const Button = styled.button`
    background-color: ${colors.purple};
    color: white;
    font-weight: bold;
    font-size: 16pt;
    border-radius: 25%;
    width: 200px;
    height: 40px;
    border-style: none;
`;

export default Sidebar;

    // const [isActive, setIsActive] = useState(false);
    // onClick={setIsActive(!isActive)}
    // color={isActive ? activeColor : "black"}