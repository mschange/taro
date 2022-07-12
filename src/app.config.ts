import appRouters from "./app-routers";

const defaultConfig: Taro.Config = {
  pages: [
    "pages/index/index"
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black"
  }
}

export default defineAppConfig(appRouters[process.env.NODE_ENV as string] || defaultConfig)
