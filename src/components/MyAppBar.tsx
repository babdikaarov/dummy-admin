import {
  AppBar,
  ToggleThemeButton,
  LoadingIndicator,
  useTheme,
} from "react-admin";

const lightLogo = "/ololo-creativehubs-black.svg";
const darkLogo = "/ololo-creativehubs-white.svg";

const MyAppBar: React.FC = () => {
  const [theme] = useTheme();
  const isDarkMode = theme === "dark";
  const logo = isDarkMode ? darkLogo : lightLogo;

  return (
    <AppBar
      elevation={1}
      toolbar={
        <>
          <div className="w-full flex justify-start">
            <img
              src={logo}
              alt="Ololo Logo"
              style={{ height: 40, marginRight: 16 }}
            />
          </div>
          <ToggleThemeButton />
          {/* <LoadingIndicator /> */}
        </>
      }
    />
  );
};

export default MyAppBar;
