interface ConfigsProps {
    [key: string]: Taro.Config
}

const configs: ConfigsProps = {
    test1: {
        pages: [
            "pages/index/index",
        ],
        window: {
            backgroundTextStyle: "light",
            navigationBarBackgroundColor: "#fff",
            navigationBarTitleText: "WeChat",
            navigationBarTextStyle: "black"
        }
    },
    test2: {
        pages: [
            "pages/test/index",
        ],
        window: {
            backgroundTextStyle: "light",
            navigationBarBackgroundColor: "#fff",
            navigationBarTitleText: "WeChat",
            navigationBarTextStyle: "black"
        }
    }
}

export default configs