import { View, ViewProps } from "@tarojs/components"
import { Key, ReactElement, ReactNode } from "react"

export interface TcListProps extends ViewProps {
    /** 类名-用于自定义样式 */
    className?: string
    dataSource: any[]
    rowKey?: Key | string | ((record: any) => string)
    /** 选择功能的配置 */
    renderItems?: (records: any) => ReactElement
}
export interface TcListItemProps extends ViewProps {
    /** 类名-用于自定义样式 */
    className?: string

    /** 主标题 */
    title: string | ReactNode

    /** 子组件 */
    children?: ReactElement | ReactElement[]
}
export default function TcList({
    className,
    renderItems,
    dataSource = [],
    rowKey,
    ...props
}: TcListProps): ReactElement {
    console.log(dataSource, "data")
    let children = renderItems ? dataSource?.map((item: any, index: number) => {
        return renderItems(item)
    }) : []
    return <View className={`tc-list ${className || ""}`} {...props}>
        {children}
    </View>
}

function Item({
    className,
    title,
    children,
    ...props
}: TcListItemProps): ReactElement {

    return <View className={`${className || ""}`} {...props} style={{border: "1px solid red", borderRadius: "4px", marginBottom: 20}}>
        <View className='tc-list-item-wrap'>
            <View className='tc-list-item-title-wrap'>
                <View className='tc-list-item-title'>{title}</View>
            </View>
            {children}
        </View>
    </View>
}


TcList.Item = Item
