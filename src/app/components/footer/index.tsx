import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Footers = styled.div`
  width: 100%;
  height: 590px;
  display: flex;
  background: #343434;
  background-size: cover;
`;

export default function Footer() {
  const authMember = null;

  return (
    <Footers>
      <Container>
        <Stack flexDirection={'row'} sx={{ mt: '94px' }}>
          <Stack flexDirection={'column'} style={{ width: '340px' }}>
            <Box>
              <img width={'100px'} src={'/icons/brickoven.png'} />
            </Box>
            <Box className={'foot-desc-txt'}>
              About New York Pizza New York pizza is famous for its thin, crispy
              crust, rich tomato sauce, and perfectly melted mozzarella cheese.
              Each slice is foldable and loaded with quality ingredients, making
              it a quintessential taste of the city. Enjoy a slice and savor New
              York's culinary heritage!
            </Box>
            <Box className="sns-context">
              <img src={'/icons/facebook.svg'} />
              <img src={'/icons/twitter.svg'} />
              <img src={'/icons/instagram.svg'} />
              <img src={'/icons/youtube.svg'} />
            </Box>
          </Stack>
          <Stack sx={{ ml: '288px' }} flexDirection={'row'}>
            <Stack>
              <Box>
                <Box className={'foot-category-title'}>Pages</Box>
                <Box className={'foot-category-link'}>
                  <Link to="/">Home</Link>
                  <Link to="/products">Products</Link>
                  {authMember && <Link to="/orders">Orders</Link>}
                  <Link to="/help">Help</Link>
                </Box>
              </Box>
            </Stack>
            <Stack sx={{ ml: '100px' }}>
              <Box>
                <Box className={'foot-category-title'}>Find us</Box>
                <Box
                  flexDirection={'column'}
                  sx={{ mt: '20px' }}
                  className={'foot-category-link'}
                  justifyContent={'space-between'}
                >
                  <Box flexDirection={'row'} className={'find-us'}>
                    <span>L.</span>
                    <div>Gangnam, Seoul</div>
                  </Box>
                  <Box className={'find-us'}>
                    <span>P.</span>
                    <div>+971 4 554 7777</div>
                  </Box>
                  <Box className={'find-us'}>
                    <span>E.</span>
                    <div>example@gmail.com</div>
                  </Box>
                  <Box className={'find-us'}>
                    <span>H.</span>
                    <div>Visit 24 hours</div>
                  </Box>
                </Box>
              </Box>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          style={{ border: '1px solid #C5C8C9', width: '100%', opacity: '0.2' }}
          sx={{ mt: '80px' }}
        ></Stack>
        <Stack className={'copyright-txt'}>
          © Copyright BrickOven Global, All rights reserved.
        </Stack>
      </Container>
    </Footers>
  );
}
