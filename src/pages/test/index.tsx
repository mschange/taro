import { Component, useCallback, useState } from 'react'
import { View, Text } from '@tarojs/components'

import SearchList from "../../component/SearchList"
import TcList from "../../component/TcList";
import './index.less'

const Index = () => {
	const [searchData, setSearchData] = useState<any>()
  	const onReload = useCallback((data: any) => setSearchData(data?.packageInfoVOList || []), [setSearchData]);
    return (
      <View className='test'>
        <Text>Hello world! test2</Text>
        <SearchList
            path=''
			searchBarName="test"
			onLoaded={onReload}
        >
            <TcList
              dataSource={[
                    {
                      planNumber: "planNumber",
                      orderProjectName: "工程名称",
                      count: 10,
                      productCategoryName: "塔型",
                        number: "基数"
                    },
                  {
                      planNumber: "planNumber",
                      orderProjectName: "工程名称",
                      count: 10,
                      productCategoryName: "塔型",
                        number: "基数"
                    },
                  {
                      planNumber: "planNumber",
                      orderProjectName: "工程名称",
                      count: 10,
                      productCategoryName: "塔型",
                        number: "基数"
                    }
              ]}
              renderItems={(records: any) => <TcList.Item
                title={`计划号:${records.planNumber}`}
              >
                        <View className='content'>
                            <View className='content-title'>
                                <View className='label'>塔型：</View>
                                <View>{records.productCategoryName}</View>
                            </View>
                            <View className='content-title'>
                                <View className='label'>基数：</View>
                                <View>{records.number}</View>
                            </View>
                        </View>
                    </TcList.Item>}
            />
        </SearchList>
      </View>
    )
}

export default Index;
