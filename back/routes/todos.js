const express = require("express");
const router = express.Router();
const db = require('../models');
const sequelize = require('sequelize');
      
router.get("/", async(req, res, next) => {
  // 사용자의 그날의 투두리스트 불러오기
  try {
    let today = new Date().toLocaleDateString();
    const todos = await db.Todo.findAll({
      where: {
        userId: req.user.id,
        date: today,
      },
      order: [['createdAt', 'ASC']]
    });
    return res.json({todos, today});
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.get("/last/:lastStart", async(req, res, next) => {
  // 사용자의 지난 투두리스트 불러오기
  try {
    const lastDate = await db.Todo.findOne({
      where: {
        userId: req.user.id,
        date: {[sequelize.Op.gte]:req.params.lastStart}
      },
      order: [['createdAt', 'DESC']],
    });
    const lastTodos = await db.Todo.findAll({
      where: {
        userId: req.user.id,
        date: lastDate.date,
      },
      order: [['createdAt', 'ASC']]
    });
    return res.json(lastTodos);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.delete("/last/:date", async(req, res, next) => {
  try{
    await db.Todo.destroy({
      where: {
        date: req.params.date,
        UserId: req.user.id,
      }
    });
    res.send(req.body.date);
  }catch(e){
    console.error(e);
    next(e);
  }
});

router.post("/", async(req, res, next) => {
  //지난 할일 목록에서 투두 복사
  try{
    let today = new Date().toLocaleDateString();
    let fullTodos = [];
    if(req.body){
      const copiedTodos = req.body.map((v, i)=>{
        return {content: v, UserId: req.user.id, date: today};
      })
      db.Todo.bulkCreate(copiedTodos);
      fullTodos = await db.Todo.findAll({
        where: {UserId: req.user.id, date: today}
      })
    }
    res.json(fullTodos);
  }catch(e){
    console.error(e);
    next(e);
  }
});

module.exports = router;
