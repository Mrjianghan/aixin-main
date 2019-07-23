const getters = {
  tag: state => state.tags.tag,
  theme: state => state.common.theme,
  isCollapse: state => state.common.isCollapse,
  isLock: state => state.common.isLock,
  isFullScren: state => state.common.isFullScren,
  lockPasswd: state => state.common.lockPasswd,
  tagList: state => state.tags.tagList,
  tagCurrent: state => state.tags.tagCurrent,
  tagWel: state => state.tags.tagWel,
  access_token: state => state.user.access_token,
  username: state => state.user.userInfo.username,
  permissions: state => state.user.permissions,
  menu: state => state.user.menu,
  errLog: state => state.errLog.errLog
}
export default getters
