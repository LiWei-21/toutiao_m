// 获取本机储存

export const getItem = name => {
  var data = window.localStorage.getItem(name)
  try {
    data = JSON.parse(data)
    return data
  } catch (err) {
    return data
  }
}

// 将信息保存到本机

export const setItem = (name, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
    window.localStorage.setItem(name, value)
  }

  window.localStorage.setItem(name, value)
}

// 删除存在本机的信息

export const removeItem = name => {
  window.localStorage.removeItem(name)
}
