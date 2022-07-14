import { request, showToast } from "@tarojs/taro"

function jsonStringifyReplace(_key: string, value: any) {
    if (typeof value === "undefined" || value === "undefined") {
        return
    }
    return value
}

interface ObjectType {
    [x: string]: any
}

type Method = "OPTIONS" | "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "TRACE" | "CONNECT"

const tFetch = (
    path: string,
    params?: ObjectType | undefined,
    method: Method = "GET",
    headers: ObjectType = {}
) => new Promise((resove, reject) => {
    const postData = JSON.stringify(params, jsonStringifyReplace)
    request({
        url: path,
        method,
        data: postData ? JSON.parse(postData) : "",
        header: {
            ...headers,
        },
        dataType: "json",
        success: async (res: any) => {
            if (res.data.code === 400) {
                await showToast({ title: res.data.msg || "请求失败", icon: "none", duration: 3000 })
                reject(res.data)
                return
            }
            if (res.data.code === 500) {
                await showToast({ title: res.data.msg || "请求失败", icon: "none", duration: 3000 })
                reject(res.data)
                return
            }
            resove(res.data)
        },
        fail: (error: any) => reject(error)
    });
})

export const tGet = (
    path: string,
    params?: ObjectType | undefined,
    headers?: ObjectType | undefined
) => tFetch(path, params, "GET", headers);

export const tPost = (
    path: string,
    params?: ObjectType | undefined,
    headers?: ObjectType | undefined
) => tFetch(path, params, "POST", headers);

export const tPut = (
    path: string,
    params?: ObjectType | undefined,
    headers?: ObjectType | undefined
) => tFetch(path, params, "PUT", headers);

export const tDelete = (
    path: string,
    params?: ObjectType | undefined,
    headers?: ObjectType | undefined
) => tFetch(path, params, "DELETE", headers);
