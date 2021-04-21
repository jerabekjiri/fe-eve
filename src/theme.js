import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#44A6D8',
      main: '#028FDB',
      darkest: '#013C5C',
      contrastText: '#fff'
    }
  },
  custom: {
    primary: {
      light: '#44A6D8',
      main:'#028fdb',
      dark: '#015D8F',
      darker: '#327AA1',
      darkest: '#013C5C',
      contrastText: '#fff'
    },
    price: '#ba000d'
  },
  typography: {
    subtitle1: {
      color: "#606060",
    }
  }
})