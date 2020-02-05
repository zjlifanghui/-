// pages/user/user.js
const app=getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userPhoto: "../../images/user/user-unlogin.png",
    nickName: "",
    logged: false,
    disabled: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //调用login云函数
      wx.cloud.callFunction({
        name: `login`,
        data:{},
      }).then((res)=>{
        db.collection(`user`).where({
          _openid: res.result._openid
        }).get().then((res)=>{
          if(res.data.length){
            app.userInfo=Object.assign(app.userInfo, res.data[0]);
            this.setData({
              userPhoto: app.userInfo.userPhoto,
              nickName: app.userInfo.nickName,
              logged: true
            });
          }else{
            this.setData({
                disabled:false
            });
          }
        });
      });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      userPhoto: app.userInfo.userPhoto,
      nickName: app.userInfo.nickName
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //授权登录
  bindGetUserInfo(e){
    //console.log(e)
    let userInfo=e.detail.userInfo;
    if(!this.data.logged && userInfo){
      db.collection(`user`).add({
        data:{
          userPhoto: userInfo.avatarUrl,
          nickName: userInfo.nickName,
          phoneNumber: '',
          links: 0,
          time: new Date()
        }
      }).then((res)=>{
        db.collection(`user`).doc(res._id).get().then((res)=> {
        app.userInfo=Object.assign(app.userInfo, res.data)
        this.setData({
          userPhoto: app.userInfo.userPhoto,
          nickName:app.userInfo.nickName,
          logged: true
        })
       });
      });
    }
  }
})