
import Menu from '../models/menu.js';

export const getMenus = async (req, res) => {
  try {
    const menus = await Menu.find();
    res.json(menus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createMenu = async (req, res) => {
  try {
    const menu = new Menu(req.body);
    await menu.save();
    res.status(201).json(menu);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
