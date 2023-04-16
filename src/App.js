import './App.css';
//https://mui.com/material-ui/customization/color/
import { createTheme } from '@mui/material/styles';
import { lightBlue } from '@mui/material/colors';
import {red} from '@mui/material/colors';
//https://mui.com/material-ui/customization/theming/#theme-provider
//ただしimportに関する記述なし
import { ThemeProvider } from '@mui/material/styles';
import NavBar from './components/NavBar';
import Main from './components/Main';
import ApiContextProvider from './context/ApiContext';

const theme=createTheme({
  palette :{
    primary: lightBlue,
    secondary: red,
  },
  typography:{
    //App.css内でgooglefontから＠importしてCSS rules to specify familiesの記述をここに書く
    fontFamily: "'M PLUS 1p', sans-serif",
  },
});

function App() {
  return (
    <ApiContextProvider>
    <ThemeProvider theme={theme}>
            <NavBar />
            <Main />
    </ThemeProvider>
    </ApiContextProvider>
  );
}

export default App;
