// components/sd-tree/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
      dataTree: {
        type: Array,
        value: []
      },
      treeListIndex: { // 当期树形列表的索引
        type: Number,
        value: 1
      },
      isOpenAll: { // 是否展开全部节点
        type: Boolean,
        value: false
      }
    },
    observers: {
      'dataTree': function (params) {
          console.log('---')
        this.setData({
          tree: this._initSourceData(params)
        })
      }
    },
    /**
     * 组件的初始数据
     */
    data: {
      tree: [],
      allChoiceIdList: [] // 所有选中的id数组
    },
    /**
     * 组件的方法列表
     */
    methods: {
      isOpen(e) {
        const open = 'tree[' + e.currentTarget.dataset.index + '].open'
        this.setData({
          [open]: !this.data.tree[e.currentTarget.dataset.index].open
        })
      },
      _initSourceData(nodes) {
        nodes.forEach(element => {
          if (element.checked === undefined) element.checked = 0
          element.open = this.properties.isOpenAll // 是否展开
          if (element.children && element.children.length > 0) element.children = this._initSourceData(element.children)
        })
        return nodes
      },
      // 选择
      select(e) {
        let item = e.currentTarget.dataset.item
        item = this._handleClickItem(item)
        // console.log('当前节点:', item)
        this.data.tree = this._updateTree(this.data.tree, item)
        this.setData({
          tree: this.data.tree
        })
        this.data.allChoiceIdList = this.getAllChoiceId(this.data.tree)
        this.triggerEvent('select', { item: item, idList: this.data.allChoiceIdList }, { bubbles: true, composed: true })
        this.triggerEvent('clickItem', { item: item }, { bubbles: true, composed: true })
      },
      // 选择冒泡事件
      handleSelect(e) {
        let parent = e.currentTarget.dataset.parent
        let currentTap = e.detail.item
        // console.log('parent节点:', parent)
        // 修正它的父节点
        parent.children = this._updateTree(parent.children, currentTap)
        const { half, all, none } = this.getChildState(parent.children)
        // console.log(`half:${half},all:${all},none:${none}`)
        if (half) parent.checked = -1
        if (all) parent.checked = 1
        if (none) parent.checked = 0
        // 修正整个tree
        this.data.tree = this._updateTree(this.data.tree, parent)
        this.setData({
          tree: this.data.tree
        })
        this.data.allChoiceIdList = this.getAllChoiceId(this.data.tree)
        this.triggerEvent('select', { item: parent, idList: this.data.allChoiceIdList }, { bubbles: true, composed: true })
      },
      /**
       * @method 处理点击选择
       * @param {Object} node 节点对象
       * @returns {Object} node 处理完毕的节点
       * @description 有子节点则全选中或全取消，当前为最底层单节点则选中或单取消
       */
      _handleClickItem(node) {
        switch (node.checked) {
          case 0:
            node.checked = 1
            if (node.children && node.children.length > 0) node.children = this._allChoice(node.children)
            break;
          case 1:
            node.checked = 0
            if (node.children && node.children.length > 0) node.children = this._allCancel(node.children)
            break;
          default:
            node.checked = 1
            if (node.children && node.children.length > 0) node.children = this._allChoice(node.children)
            break;
        }
        return node
      },
      /**
       * @method 全选
       * @param {Array} nodes 节点数组
       * @returns {Array} nodes 处理完毕的节点数组
      */
      _allChoice(nodes) {
        if (nodes.length <= 0) return
        for (let i = 0; i < nodes.length; i++) {
          nodes[i].checked = 1
          if (nodes[i].children && nodes[i].children.length > 0) nodes[i].children = this._allChoice(nodes[i].children)
        }
        return nodes
      },
      /**
       * @method 全取消
       * @param {Array} nodes 节点数组
       * @returns {Array} nodes 处理完毕的节点数组
      */
      _allCancel(nodes) {
        if (nodes.length <= 0) return
        for (let i = 0; i < nodes.length; i++) {
          nodes[i].checked = 0
          if (nodes[i].children && nodes[i].children.length > 0) nodes[i].children = this._allCancel(nodes[i].children)
        }
        return nodes
      },
      /**
       * @method 更新tree
       * @param {Array} tree 节点树
       * @param {Object} newItem 需要替换新节点
       * @description 找到tree中目标进行替换
       */
      _updateTree(tree, newItem) {
        if (!tree || tree.length <= 0) return
        for (let i = 0; i < tree.length; i++) {
          if (tree[i].id === newItem.id) {
            tree[i] = newItem
            break
          } else {
            if (tree[i].children && tree[i].children.length > 0) {
              tree[i].children = this._updateTree(tree[i].children, newItem)
            }
          }
        }
        return tree
      },
      /**
       * @method 获取子节点的状态
       * @param {Array} node 节点数组
       */
      getChildState(node) {
        let all = true;
        let none = true;
        for (let i = 0, j = node.length; i < j; i++) {
          const n = node[i];
          if (n.checked === 1 || n.checked === -1) {
            none = none && false;
          }
          if (n.checked === 0 || n.checked === -1) {
            all = all && false
          }
        }
        return { all, none, half: !all && !none };
      },
      // 获取所有选中的节点id
      getAllChoiceId(nodes, res = []) {
        for (let i = 0; i < nodes.length; i++) {
          if (nodes[i].checked === 1) res.push(nodes[i].userId)
          if (nodes[i].children && nodes[i].children.length > 0) this.getAllChoiceId(nodes[i].children, res)
        }
        return res
      }
    }
  })
  
  