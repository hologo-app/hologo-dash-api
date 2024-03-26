const Lenses = require('./../model/Lens');
const fs = require('fs');

const getAllLenses = async (req, res) => {
    try {
        const lenses = await Lenses.findAll();
        if (lenses.length === 0) return res.status(204).json({ 'message': 'No lenses found.' });
        res.json(lenses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ 'message': 'Internal server error.' });
    }
}

const createNewLens = async (req, res) => {
    try {
        const { lensCategory, lensName, lensGroupID , lensImage } = req.body;

        const newLens = await Lenses.create({
            lensCategory,
            lensName,
            lensGroupID,
            lensImage,
            activeStatus: true
        });

        res.status(201).json(newLens);
    } catch (error) {
        console.error(error);
        res.status(500).json({ 'message': 'Internal server error.' });
    }
}

const updateLens = async (req, res) => {
    try {
        const { lensID, lensCategory, lensName, lensGroupID, lensImage, activeStatus } = req.body;
        const lens = await Lenses.findByPk(lensID);
        if (!lens) {
            return res.status(204).json({ "message": `No lens matches ID ${lensID}.` });
        }
        await lens.update({
            lensCategory,
            lensName,
            lensGroupID,
            lensImage,
            activeStatus
        });
        res.json(lens);
    } catch (error) {
        console.error(error);
        res.status(500).json({ 'message': 'Internal server error.' });
    }
}

const deleteLens = async (req, res) => {
    try {
        const { lensID }  = req.body;
        const lens = await Lenses.findByPk(lensID);
        if (!lens) {
            return res.status(204).json({ "message": `No lens matches ID ${lensID}.` });
        }
        await lens.destroy();
        res.json({ "message": "Lens deleted successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 'message': 'Internal server error.' });
    }
}

const getLens = async (req, res) => {
    try {
        const { id } = req.params;
        const lens = await Lenses.findByPk(id);
        if (!lens) {
            return res.status(204).json({ "message": `No lens matches ID ${id}.` });
        }
        res.json(lens);
    } catch (error) {
        console.error(error);
        res.status(500).json({ 'message': 'Internal server error.' });
    }
}

module.exports = {
    getAllLenses,
    createNewLens,
    updateLens,
    deleteLens,
    getLens
}
