import React from 'react';
import styled from "styled-components";

function RenderNavBar() {
    return (
<>
<FlexContainer>
<h1>Feather</h1>
</FlexContainer>
</>
    )
};
export default RenderNavBar;

const FlexContainer = styled.div`
background: #334F79;
max-width: 120rem;
display: flex;
margin: auto;
padding: 0 2rem;;
justify-content: space-between;
height: 5rem;
`;

