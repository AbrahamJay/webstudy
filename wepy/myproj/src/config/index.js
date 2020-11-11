import http from './httpRequest'

export const getPlatform = (data) => {
  return http({
    url: '/api/v1/preview/platform',
    method: 'POST',
    data
  })
}
