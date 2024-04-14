const Lenses = require('./../../model/Lens')

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
    getLens
}
