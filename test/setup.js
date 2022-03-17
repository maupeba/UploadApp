jest.mock("react-native-image-picker", () => ({ launchImageLibrary: jest.fn() }))
jest.mock("react-native-paper", () => ({ ProgressBar: jest.fn(), Colors: jest.fn() }))