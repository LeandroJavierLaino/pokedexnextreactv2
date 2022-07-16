import React from 'react'
import { Box, Theme } from '@mui/material'

type ScreenProps = {
  theme: Theme
  children: JSX.Element
}

export const Screen: React.FC<ScreenProps> = ({ theme, children }) => {
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.common.white,
        boxShadow: 'inset 0px 0px 15px black',
      }}
      className="crt"
    >
      {children}
    </Box>
  )
}
