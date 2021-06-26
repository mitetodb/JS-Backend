const Accessory = require('../models/Accessory');

async function getAllAccessories(existing) {
    return Accessory.find({ _id: { $nin: existing }}).lean();
}

async function createAccessory(accessory) {
    const record = await Accessory(accessory);
    
    await record.save();
}

module.exports = {
    createAccessory,
    getAllAccessories
};