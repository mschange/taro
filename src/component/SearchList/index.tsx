import useRequest from "@ahooksjs/use-request"
import { Input, View } from "@tarojs/components"
import { usePullDownRefresh, useReachBottom, stopPullDownRefresh } from "@tarojs/taro"
import { ReactElement, useState } from "react"
import { tGet } from "../../request/index";

interface SearchList {
    path: string
	children?: ReactElement | ReactElement[]
	searchBarName?: string | false | undefined
    /** 是否需要分页 默认是true */
    isPages?: boolean
    onReachBottom?: () => void
    /** 加载完成 暴露请求数据 */
    onLoaded?: (listData: any[], dataSource: any) => void
}

const Comp = ({
    path,
    children,
    isPages = true,
    onReachBottom,
	onLoaded,
	searchBarName
}: SearchList) => {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [dataSource, setDataSource] = useState<any[]>([])
    const [seachValue, setSearchValue] = useState<string>("")
    usePullDownRefresh(async() => {
        await run({})
        stopPullDownRefresh()
    })
    useReachBottom(async() => {
        if (isPages && currentPage < data?.pages) {
            await run({ current: currentPage + 1 })
            setCurrentPage(currentPage + 1)
        }
        onReachBottom && onReachBottom()
    })
    const { loading, run, data } = useRequest<any>((params: { [key: string]: any } = {}) => new Promise(async (resole, reject) => {
      try {
          console.log("来了没")
            const pagesParams = { current: 1, size: 10 }
            const result: any = await tGet(path, isPages ? { ...pagesParams, ...params } : { ...params })
            const resultData =  result.data || []
            if (isPages) {
                const newDataSource = currentPage > 1 ? [...dataSource, ...resultData] : [...resultData]
                setDataSource(newDataSource)
                onLoaded && onLoaded(newDataSource, result)
            } else {
                onLoaded && onLoaded(resultData, result)
            }
            resole(result.data)
        } catch (error) {
            console.log(error)
            reject(false)
        }
    }), { ready: !!path, refreshDeps: [path] })
    return <View>
		{searchBarName && <Input
			placeholder='请输入查询内容'
			style={{ border: "1px solid #ddd", height: "30px", lineHeight: "30px", marginBottom: 20 }}
			onInput={(e: any) => run({[searchBarName]: e?.detail?.value})}
		/>}
        {
            children
        }
    </View>
}

export default Comp;
