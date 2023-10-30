const { response } = require("express");
const { Todo } = require("../models");

const findAllTodos = async (req, res) => {
  try {
    const data = await Todo.findAll();

    const result = {
      status: "success",
      data: data,
    };

    res.status(200).json(result);
  } catch (error) {
    console.log("error");
  }
};

const getTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Todo.findByPk(id);

    if (data === null) {
      return res.status(404).send({ status: "failed", message: "Data tidak ditemukan" });
    }

    res.json({
      status: "success",

      data: data,
    });
  } catch (error) {
    console.log(error);
  }
};

const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    console.log(req.body);

    const newTodo = await Todo.create({ title: title, description: description });

    res.status(201).json({
      status: "success",
      data: {
        id: newTodo.id,
        title: newTodo.title,
        description: newTodo.description,
      },
    });
    console.log(res);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    console.log(req.body);

    const todo = await Todo.findByPk(id);

    if (!todo) {
      res.status(404).json({ message: "data tidak ditemukan" });
    }

    todo.title = title;
    todo.description = description;

    res.status(201).json({
      status: "success",
      data: {
        id: todo.id,
        title: todo.title,
        description: todo.description,
      },
    });
  } catch (error) {
    // console.log(error);
    throw error;
    // throw error;
  }
};

const removeTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findByPk(id);

    if (!todo) {
      res.status(404).json({ message: "data tidak ditemukan" });
    }

    todo.destroy();

    res.status(201).json({
      status: "success",
      message: `berhasil mengahapus data dengan id ${id}`,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = { findAllTodos, getTodoById, createTodo, updateTodo, removeTodo };
