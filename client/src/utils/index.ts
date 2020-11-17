import { createMuiTheme, Theme, ThemeOptions } from '@material-ui/core/styles';

const passwordRegexPattern = '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,45}$';
const emailRegexPattern = '^[a-zA-Z0-9.$+_~-]+@[a-zA-Z0-9]+(.[a-zA-Z0-9-]{2,})+$';

export function testRegex(pattern: string, input: string): boolean {
  const regex = new RegExp(pattern);
  return regex.test(input);
}

export function testPassword(password: string): boolean {
  return testRegex(passwordRegexPattern, password);
}

export function testEmail(email: string): boolean {
  return testRegex(emailRegexPattern, email);
}

export function createMyTheme(options: ThemeOptions): Theme {
  return createMuiTheme({
    //inputVariant: "standard",
    appDrawer: {
      width: 225,
      breakpoint: 'lg',
    },
    ...options,
  });
}

export function convertFromFullName(fullName: string): [string, string] {
  const split = fullName.trim().split(' ');
  const firstName = split[0];
  const lastName = split.slice(1).join(' ');
  return [firstName, lastName];
}

export function isServerSide(): boolean {
  return typeof window === 'undefined';
}

export function getHeightPercentile(): number {
  const { pageYOffset, innerHeight } = window;
  const { offsetHeight } = document.body;
  return (innerHeight + pageYOffset) / offsetHeight;
}

export function getRandom(min = 0, max = 100): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
