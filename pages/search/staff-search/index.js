// pages/search/staff-search/index.js
import { personTree } from '../../../api/public';
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navBarHeight: app.globalData.navBarHeight,
    titleProps: {
      title: '选择员工',
    },
    pageData: [],
    renderData: [],
    loading: false,
    peoplePageIndex: [], //存储节点索引
    peoplePageLabel: [],
    selectedIds: [], // 所有选中的id数组
  },

  fetchData: async function () {
    let { data } = await personTree();
    let renderData = this.addproperty(data[0].children);
    this.setData({
      loading: false,
      pageData: renderData,
      renderData,
    });
  },
  //添加 checked和isLeaf属相
  addproperty: function (nodes) {
    nodes.forEach((node) => {
      node.checked = 0;
      if (node.children && node.children.length > 0) {
        node.isLeaf = false;
        this.addproperty(node.children);
      } else {
        node.isLeaf = true;
      }
    });
    return nodes;
  },

  // 返回上层树
  backPage: function () {
    let array = this.data.peoplePageIndex;
    array.pop();
    // 更新页面数据
    this.setData({
      peoplePageIndex: array,
    });
    if (this.data.peoplePageIndex.length == 0) {
      this.setData({
        renderData: this.data.pageData,
      });
      return;
    }
    let res = this.getSiblingTree(this.data.peoplePageIndex, this.data.pageData);
    this.setData({
      renderData: res,
    });
  },

  //抽出对应树页面
  getSiblingTree(indexesArray, treeData) {
    let currentNode = treeData;

    // 根据索引数组逐级遍历树
    for (let i = 0; i < indexesArray.length - 1; i++) {
      const index = indexesArray[i];
      // 查找当前节点的子节点中是否有匹配的index
      const childNode = currentNode[index];
      // 如果没有找到匹配的index，则返回空数组，表示未找到同层节点树
      if (!childNode) return [];
      // 更新当前节点为找到的子节点，准备进行下一轮匹配
      currentNode = childNode.children;
    }

    // 获取最后一个索引对应节点的父节点
    const parentNode = currentNode[indexesArray[indexesArray.length - 1]];
    // 返回父节点的子节点数组
    return parentNode.children;
  },

  // 下一页
  gotoNextNode: function (e) {
    let { id, index, isleaf, label } = e.currentTarget.dataset;
    if (isleaf) return;
    this.setData({
      peoplePageLabel: [...this.data.peoplePageLabel, label],
      peoplePageIndex: [...this.data.peoplePageIndex, index],
      renderData: this.data.renderData[index].children,
    });
  },
  //  跳页
  navToNode(e) {
    let { index } = e.currentTarget.dataset;
    let newIdxAry = this.data.peoplePageIndex.slice(0, index + 1);
    let res = this.getSiblingTree(newIdxAry, this.data.pageData);
    this.setData({
      peoplePageLabel: this.data.peoplePageLabel.slice(0, index + 1),
      peoplePageIndex: newIdxAry,
      renderData: res,
    });
  },

  // 去首节点
  navToTop() {
    this.setData({
      peoplePageLabel: [],
      peoplePageIndex: [],
      renderData: this.data.pageData,
    });
  },

  //   check 点击
  onChange(e) {
    let node = e.currentTarget.dataset.item;
    node = this.updateChildren(node);
    this.data.pageData = this.updateTree(this.data.pageData, node);
    this.updateAncestors(node);
    let selectedIds = this.findCheckedNodes(this.data.pageData)
      .filter((ele) => ele.includes('_'))
      .map((item) => item.split('_')[1]);
    if (this.data.peoplePageIndex.length == 0) {
      this.setData({
        renderData: this.data.pageData,
        selectedIds,
      });
    } else {
      let res = this.getSiblingTree(this.data.peoplePageIndex, this.data.pageData);
      this.setData({
        renderData: res,
        selectedIds,
      });
    }
  },

  // 将新的子节点挂载到树上
  updateTree(tree, newItem) {
    if (!tree || tree.length <= 0) return;
    for (let i = 0; i < tree.length; i++) {
      if (tree[i].id === newItem.id) {
        tree[i] = newItem;
        break;
      } else {
        if (tree[i].children && tree[i].children.length > 0) {
          tree[i].children = this.updateTree(tree[i].children, newItem);
        }
      }
    }
    return tree;
  },

  //   更新组件
  updateAncestors(node) {
    if (node.pid == '1') {
      return;
    }
    const parentNode = this.findNodeById(node.pid, this.data.pageData);
    parentNode.checked = this.calculateParentCheckedStatus(parentNode.children);
    this.updateAncestors(parentNode);
  },

  // 计算父节点的选中状态
  calculateParentCheckedStatus(children) {
    let allChecked = true;
    let someChecked = false;

    for (const child of children) {
      if (!child.checked) {
        allChecked = false;
      } else {
        someChecked = true;
      }
    }

    if (allChecked) {
      return 1; // 全部选中
    } else if (someChecked) {
      return -1; // 部分选中
    } else {
      return 0; // 全部未选中
    }
  },

  //找父节点
  findNodeById(id, nodes) {
    for (const node of nodes) {
      if (node.id === id) {
        return node;
      }
      if (node.children) {
        const found = this.findNodeById(id, node.children);
        if (found) {
          return found;
        }
      }
    }
    return null;
  },

  // 子节点全选
  updateChildren(node) {
    if (node.checked === 0 || node.checked === undefined) {
      node.checked = 1;
      if (node.children && node.children.length > 0)
        node.children = this.checkAllDescendants(node.children);
    } else {
      node.checked = 0;
      if (node.children && node.children.length > 0)
        node.children = this.uncheckAllDescendants(node.children);
    }
    return node;
  },

  // 遍历全选
  checkAllDescendants(nodes) {
    if (nodes.length <= 0) return;
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].checked = 1;
      if (nodes[i].children && nodes[i].children.length > 0)
        nodes[i].children = this.checkAllDescendants(nodes[i].children);
    }
    return nodes;
  },
  // 遍历取消勾选
  uncheckAllDescendants(nodes) {
    if (nodes.length <= 0) return;
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].checked = 0;
      if (nodes[i].children && nodes[i].children.length > 0)
        nodes[i].children = this.uncheckAllDescendants(nodes[i].children);
    }
    return nodes;
  },

  //   返回所选节点
  findCheckedNodes(tree, checkedNodes = []) {
    tree.forEach((node) => {
      if (node.checked == '1') {
        checkedNodes.push(node.key);
      }
      if (node.children) {
        this.findCheckedNodes(node.children, checkedNodes);
      }
    });
    return checkedNodes;
  },

  filterUserId(ids) {
    return ids.filter((ele) => ele.includes('_'));
  },

  confrim(e) {
    const pages = getCurrentPages();
    const prePage = pages[pages.length - 2];
    prePage.setData({
      userIdList: this.data.selectedIds ?? [],
    });
    if (prePage.data.pageNo) {
    }else{
        prePage.getPageData();
    }
    wx.navigateBack({
      delta: 1,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.fetchData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
