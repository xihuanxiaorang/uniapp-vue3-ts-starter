declare global {
  /**
   * 统一响应结构体
   */
  interface Result<T> {
    /**
     * 响应码
     */
    code: string
    /**
     * 响应消息
     */
    msg: string
    /**
     * 响应数据
     */
    data: T
  }
}
export {}
