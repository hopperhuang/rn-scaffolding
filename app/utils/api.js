function apiComposer(params) {
    const { url, config } = params
    // const { headers } = config
    const defaultHeaders = {
        'Accept': 'application/json',
        'versionName': 1,
        'versionCode': 1,
        'equipmentKey': 'mobile'
    }
    const { method } = config
    // 默认情况,根据get/post请求来设定contentType头部
    if (method === 'GET') {
        defaultHeaders['Content-Type'] = 'application/json'
    }   else {
        defaultHeaders['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    // 根据根据请求头来设定body，json还是formdata形式发送
    let body
    const configBody = config.body
    if (configBody) {
        body = ''
        const keys = Object.keys(configBody)
        for (let index = 0; index < keys.length; index += 1) {
            const key = keys[index]
            const value = configBody[key]
            if (index === 0) {
                body += `${key}=${value}`
            }   else {
                body += `&${key}=${value}`
            }
        }      
    }   
    // 自定义headers，修改defaultHeaders
    // 新body覆盖旧的body
    const finalConfig = { ...config, headers: { ...defaultHeaders, ...config.headers }, body }
    
    return async () => {
        try {
            const response = await fetch(url, finalConfig).then(res => res.json()).then(jsondata => jsondata)
            return response
        } catch (error) {
            return { error }
        }
    }
}

// 正常配置头部即可，需要token则在头部加入
async function fetchHomeData(params) {
    const { type, size, page, authorizationCode } = params
    const url = `http://test.api.youdustory.com/read/home/${type}/${page}/${size}`
    let config
    if (authorizationCode) {
       config = {
           method: 'GET',
           headers: {
               'authorizationCode': authorizationCode
           }
       } 
    }   else {
        config = {
            method: 'GET'
        }
    }
    return apiComposer({ url, config })()
}

const api = {
    fetchHomeData
}

export default api
