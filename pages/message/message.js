// pages/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    pageIndex:0,
    hasMore:true,
    pageSize:2
  },

  loadMore:function(){
    // 如果已经没有下一页停止执行函数
    if(this.data.hasMore == false)return;
    // 获取二个参数 pno pageSize
    var pno = this.data.pageIndex + 1;
    var ps = this.data.pageSize;
    // 创建ajax请求
    wx.request({
      url:"http://127.0.0.1:3000/getMessage",
      data:{pno:pno,pageSize:ps},
      success:(res)=>{
        // console.log(res);
        // 接收返回数据
        // 拼接数组
        var rows = this.data.list.concat(res.data.data);
        // 获取总页数判断是否有下一页
        var pageCount = res.data.pageCount;
        var flag = pno < pageCount;
        // 将返回数据保存data属性
        this.setData({
          list:rows,
          hasMore:flag,
          pageIndex:pno
        });
        // 添加动态效果 添加加载动画
        wx.showLoading({
          title: '正在加载数据...',
        });
        setTimeout(function(){
          wx.hideLoading();
        },500)
        // ‘加载动画’ 隐藏
      }
    })
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadMore();
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadMore();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})