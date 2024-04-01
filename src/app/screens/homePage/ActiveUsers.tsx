import React from 'react';

import { Box, Container, Stack } from '@mui/material';
import Card from '@mui/joy/Card';
import { CssVarsProvider, Typography } from '@mui/joy';
import { CardOverflow, AspectRatio } from '@mui/joy';

export default function ActiveUsers() {
  const activeUsers = [
    { usertName: 'Martin', imagePath: '/img/martin.webp' },
    { usertName: 'Justin', imagePath: '/img/justin.webp' },
    { usertName: 'Rose', imagePath: '/img/rose.webp' },
    { usertName: 'Nusret', imagePath: '/img/nusret.webp' },
  ];

  return (
    <div className="active-users-frame">
      <Container>
        <Stack className="main">
          <Box className="category-title">Active Users</Box>
          <Stack className="cards-frame">
            <CssVarsProvider>
              {activeUsers.length !== 0 ? (
                activeUsers.map((ele, index) => {
                  return (
                    <Card key={index} variant="outlined" className="card">
                      <CardOverflow>
                        <AspectRatio ratio="1">
                          <img src={ele.imagePath} alt="" />
                        </AspectRatio>
                      </CardOverflow>

                      <CardOverflow variant="soft" className="member-nickname">
                        <Typography>{ele.usertName}</Typography>
                      </CardOverflow>
                    </Card>
                  );
                })
              ) : (
                <Box className="no-data">No Active Users!</Box>
              )}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
