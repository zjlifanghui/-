const db=wx.cloud.database();
const forum=db.collection("forum");

// pages/index/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tasks:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.getDate(res =>{});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
    this.getDate(res=>{
      wx.stopPullDownRefresh();
      this.pageDate.skip=0;
    },res=>{
      callback();
    });
   
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
   this.getDate();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //刷新数据函数
  getDate:function(callback){
    if(!callback){
      callback= res=>{}
    }
    wx.showLoading({
      title: '数据加载中',
    })
    forum.skip(this.pageDate.skip).get().then(res=>{
      let oldDate=this.data.tasks;
      this.setData({
        tasks:this.data.tasks.concat(res.data)
      })
      this.pageDate.skip = this.pageDate.skip+10
      wx.hideLoading({
        complete: (res) => {},
      })
      console.log(res)
  })
  },
  pageDate:{
    skip:0
  }
})