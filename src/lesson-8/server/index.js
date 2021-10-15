const express = require('express');
const fs = require('fs-extra');
const path = require('path');
const klaw = require('klaw');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const port = 9000;

const FOODS_FILENAME = path.join(__dirname, './data/foods.json');
const ORDER_PATH = path.join(__dirname, './data/order');

// 获取所有点餐信息
const getOrders = async () => {
  return new Promise((resolve, reject) => {
    const orderFiles = [];
    klaw(ORDER_PATH)
      .on('data', async item => {
        if (item.path && path.extname(item.path) !== '.json') {
          return;
        }
        orderFiles.push(item.path);
      })
      .on('end', async () => {
        const orders = {};
        await Promise.all(
          orderFiles.map(async orderFile => {
            const user = (orderFile.match(/\/([^\/\.]+)\.json$/) || [])[1];
            const order = await fs.readJSON(orderFile);
            orders[user] = order;
          })
        );
        resolve(orders);
      });
  });
};

// 设置单个点餐信息
const setOrder = async (user, order) => {
  const orderFilename = path.join(ORDER_PATH, `${user}.json`);
  if (Object.keys(order).length === 0) {
    await fs.remove(orderFilename);
  } else {
    await fs.writeJSON(orderFilename, order, { replacer: ' ', spaces: 2 });
  }
  return true;
};

// 删除单个用户的点餐信息
const deleteOrder = async user => {
  const orderFilename = path.join(ORDER_PATH, `${user}.json`);
  if (await fs.pathExists(orderFilename)) {
    await fs.remove(orderFilename);
    return true;
  }
  return false;
};

// 用户名长度 4~20，包含小写字母、数字、_、-。
const isValidUser = user => /^[a-z0-9\-_]{4,20}$/.test(user);

// 获取所有菜品
app.get('/api/foods', async (req, res) => {
  const data = await fs.readJSON(FOODS_FILENAME);
  res.send({
    code: 0,
    data,
  });
});

// 获取所有订单信息
app.get('/api/orders', async (req, res) => {
  const data = await getOrders();
  res.send({
    code: 0,
    data,
  });
});

// 点餐
app.post('/api/order', async (req, res) => {
  let { user, order } = req.body;
  if (!isValidUser(user)) {
    res.send({ code: 1, message: '用户名不正确' });
    return;
  }
  // 写死最多27个菜品
  const ids = Object.keys(order);
  if (ids.find(id => !Number(id) || Number(id) > 27) !== undefined) {
    res.send({ code: 1, message: '菜品ID不正确' });
    return;
  }
  if (
    ids.find(id => {
      const count = order[id];
      return Number.isNaN(count) || count < 0 || count > 100;
    }) !== undefined
  ) {
    res.send({ code: 1, message: '点餐数量不正确' });
    return;
  }
  const result = await setOrder(user, order);
  res.send({
    code: 0,
    data: result,
  });
});

// 删除某个用户的点餐信息
app.delete('/api/order', async (req, res) => {
  const { user } = req.body;
  if (!isValidUser(user)) {
    res.send({ code: 1, message: '用户名不正确' });
    return;
  }
  const result = await deleteOrder(user);
  res.send({
    code: 0,
    data: result,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
