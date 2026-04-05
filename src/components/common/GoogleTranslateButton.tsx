import { Button, Box} from '@mui/material'
import TranslateOutlined from '@mui/icons-material/TranslateOutlined'
import {ON_DARK_MUTED,ON_DARK_SECONDARY,ON_DARK_PRIMARY} from '../../theme'

export const TranslateButton = () => {
  const handleClick = () => {
    const el = document.querySelector('.goog-te-gadget-simple') as HTMLElement
    el?.click()
  }

  return (
	   <Box sx={{ position: 'relative' }}>
    <Button
      onClick={handleClick}
      variant="outlined"
      startIcon={<TranslateOutlined />}
      sx={{
        borderColor: ON_DARK_MUTED,
        color: ON_DARK_SECONDARY,
        '&:hover': {
          borderColor: ON_DARK_PRIMARY,
          color: ON_DARK_PRIMARY,
          bgcolor: 'rgba(255,255,255,0.06)',
        },
      }}
    >
      Translate
    </Button>
	 </Box>
  )
}