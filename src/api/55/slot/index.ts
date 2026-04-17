/*
 * @Description:
 * @Author: zyg0121 zhouyiguo2012@qq.com
 * @Date: 2023-08-20
 * @LastEditors: zyg0121 zhouyiguo2012@qq.com
 * @LastEditTime: 2023-08-20
 */
import request from '@/api/request'

/**
 * 获取slot信息
 * @returns Promise<Slot55V1Types.IResponse>
 */
export const slot = () => {
  return request.get<Slot55V1Types.IResponse>('/55/slot')
}

/**
 * 获取业余卫星状态
 * @returns Promise<SlotSatTypes.IResponse>
 */
export const slotSat = () => {
  return request.get<SlotSatTypes.IResponse>('/55/slot/sat')
}
